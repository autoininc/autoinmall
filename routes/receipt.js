exports.show = function (req, res, db) {
	var id = req.query.id;
	var uid = req.query.uid;
	var total = req.query.total;
	var card = req.query.card;
	var condition = req.query.condition;
	var err = req.query.err;
	var address = req.query.address;
	var zipcode = req.query.zipcode;
	var email = req.query.email;
	var name = req.query.name;
	var date = req.query.date;
	var cart_id = "AM" + req.session.userid + date;
	var data;
	var sess = req.session;
	if (condition === "success") {
		data = {
			condition: condition,
			id: id,
			uid: uid,
			total: total,
			card: card,
			date: date,
			name: name,
			email: email,
			address: address,
			zipcode: zipcode
		}
		var data_set = {
			RECIPIENT: sess.userid,
			ORDER_NUM: uid,
			PIN: id,
			Date: date,
			ADDRESS: address,
			ZIPCODE: zipcode,
			EMAIL: email,
			TOTAL: total,
			CARD_APPLY_NUM: card,
			CART_NUM: cart_id
		}
		db.query("INSERT INTO RECEIPT SET ?", [data_set], (err, row) => {
			if (err) {
				console.log(err);
			} else {
				//after payment success, set cart id
				db.query("UPDATE CART SET CART_ID = ? WHERE ID = ? AND CART_ID = 'before'", [cart_id, sess.userid], (err3, row3) => {
					if (err3) {
						console.log(err3);
					} else {
						res.render("receipt.html", {username: sess.username, data: JSON.stringify(data)});
					}
				})

			}
		})
	} else {
		data = {
			condition: condition,
			err: err,
			name: name
		}
		res.render("receipt.html", {username: sess.username, data: JSON.stringify(data)});
	}
}
