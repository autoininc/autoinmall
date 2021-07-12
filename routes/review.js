exports.show = function (req, res, db) {
	var pin = req.query.pin;
	var sess = req.session;
	res.render("review.html", {username: sess.username, pin: pin, user_id: sess.userid});
}


exports.delete = function (req, res, db) {
	var id = req.query.id;
	db.query("DELETE FROM REVIEW WHERE REVIEW_ID = ?", [id], (err, row) => {
		if (err) {
			console.log(err);
		} else {
			res.send("success");
		}
	})
}


exports.confirm = function (req, res, db) {
	var pin = req.body.pin;
	var user_id = req.session.userid;
	var user_name = req.session.username;
	var id = user_id + "_" + pin;
	var review = req.body.review;
	var rate = req.body.rate;
	let today = new Date();


	var data = {
		USER_NAME: user_name,
		ITEM_PIN: pin,
		USER_ID: user_id,
		RATE: rate,
		REVIEW: review,
		REVIEW_ID: id,
		REVIEW_DATE: today
	}
	db.query("INSERT INTO REVIEW SET ?", [data], (err, row) => {
		if (err) {
			console.log(err);
		} else {
			//update rate
			db.query("SELECT RATE,REVIEW_NUM FROM ITEM WHERE PIN = ?", [pin], (err2, row2) => {
				if (err2) {
					console.log(err2);
				} else {
					var num = Number(row2[0].REVIEW_NUM);
					var avg = Number(row2[0].RATE);
					var sum = avg * num;
					num = num + 1;

					avg = parseFloat((sum + Number(rate)) / num);
					avg = avg.toFixed(0);
					db.query("UPDATE ITEM SET RATE = ?, REVIEW_NUM = ? WHERE PIN = ?", [avg, num, pin], (err3, row3) => {
						if (err3) {
							console.log(err3)
						} else {
							res.send("success");
						}

					})
				}
			})

		}
	})
}
