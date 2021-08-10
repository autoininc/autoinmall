exports.add_category = function (req, res, db) {
	var main = req.body.main;
	db.query("SELECT DISTINCT SUB FROM CATEGORY_LIST WHERE MAIN = ?", [main], (err, row) => {
		if (err) {
			console.log(err);
		} else {
			var data = JSON.stringify(row);
			data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
			res.send(data);
		}
	})
}

exports.info = function (req, res, db) {
	sess = req.session;
	var pin = req.query.pin;
	db.query("select * from ITEM,ITEMINFO where PIN = ITEM_NUM AND PIN = ?", [pin], function (err, row) {
		if (err) {
			console.log(err);
		} else {
			db.query("select * from REVIEW where ITEM_PIN = ?", [pin], function (err2, row2) {
				if (err2) {
					console.log(err2);
				} else {
					var data = JSON.stringify(row);
					data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '&nbsp;').replace(/\\f/gi, ' ');

					var data2 = JSON.stringify(row2);
					data2 = data2.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '&nbsp;').replace(/\\f/gi, ' ');

					res.render("item.html", {username: sess.username, info: data, category: sess.category, review: data2, userid: sess.userid});
				}
			})

		}
	})
}

exports.contact = function (req, res, db, nodemailer) {
	var sess = req.session;
	var data = {
		fromEmail: req.body.to,
		toEmail: req.body.to,
		subject: "Item price enquiry",
		text: "From: " + sess.email + "\n" + "Item name: " + req.body.name + "\nParts number: " + req.body.parts_num + "\nPin: " + req.body.pin
	};
	nodemailer.sendmail(data, function () {
		res.send("success");
	});
}


exports.cart = function (req, res, db) {
	var name = req.body.item_name;
	var price = req.body.item_price;
	var pin = req.body.item_pin;
	var parts_num = req.body.item_parts_num;
	var volume = req.body.item_volume;
	var user = req.session.userid;
	var original = req.body.volume_original;
	var data;
	//no price
	if (price == "") {
		data = {
			ID: user,
			ITEM: name,
			PRICE: "no data",
			PIN: pin,
			PARTS_NUM: parts_num,
			VOLUME: volume
		}
	} else {
		price = parseFloat(price) * parseFloat(volume);//new input
		data = {

			ID: user,
			ITEM: name,
			PRICE: price,
			PIN: pin,
			PARTS_NUM: parts_num,
			VOLUME: volume
		}
	}

	if (!user) {
		res.send("GO SIGNIN");
	} else {
		db.query("SELECT * FROM CART WHERE PIN = ? AND CART_ID = 'before' AND ID = ?", [pin, user], (err, row) => {
			if (err) {

				console.log("err1" + err);
			} else {
				//first item input
				if (row[0] == null) {
					db.query("INSERT INTO CART SET ?", data, (err2, row2) => {
						if (err2) {
							console.log("err2" + err2);

						} else {
							//update ITEM
							var new_volume = parseInt(original) - parseInt(volume);
							db.query("UPDATE ITEM SET VOLUME = ? WHERE PIN = ? ", [new_volume, pin], (err4, row4) => {
								if (err4) {
									console.log("err4" + err4);

								} else {
									res.send(name);
								}
							})
						}
					})
				} else {
					var new_volume = parseInt(original) - parseInt(volume);
					volume = parseInt(row[0].VOLUME) + parseInt(volume);//add volume
					price = parseFloat(price) + parseFloat(row[0].PRICE);//new + before
					db.query("UPDATE CART SET VOLUME = ?, PRICE = ? WHERE PIN = ? AND CART_ID = 'before' AND ID = ?", [volume, price, pin, user], (err3, row3) => {
						if (err3) {
							console.log(err3);

						} else {
							//update ITEM
							db.query("UPDATE ITEM SET VOLUME = ? WHERE PIN = ? ", [new_volume, pin], (err4, row4) => {
								if (err3) {
									console.log("err3" + err3);

								} else {
									console.log("finish success");
									res.send(name);
								}
							})

						}
					})
				}
			}
		})
	}
}
