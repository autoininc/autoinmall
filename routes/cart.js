exports.show = function(req, res, db) {
	sess = req.session;
	if (!sess.username) {
		res.render("signin.html", { flag: 'no', username: sess.username });
	} else {
		db.query("SELECT ITEM, VOLUME, PRICE, PARTS_NUM, PIN FROM CART WHERE CART_ID = 'before' AND ID = ?", [sess.userid], (err, row) => {
			if (err) {
				console.log(err);
			} else {
				var data = JSON.stringify(row);
				db.query("SELECT * FROM RECEIPT,CART WHERE CART_ID = CART_NUM AND ID = ?", [sess.userid], (err2, row2) => {
					if (err) {
						console.log(err2);
					} else {
						var data2 = JSON.stringify(row2);
						res.render("cart.html", { username: sess.username, data: data,receipt:data2 });
					}
				})

			}
		})

	}
}


exports.delete = function(req, res, db) {
	//console.log(req.body);
	db.query("DELETE FROM CART WHERE PIN = ? AND CART_ID = 'before'", [req.body.PIN], (err, row) => {
		if (err) {
			console.log(err);
		} else {

			db.query("UPDATE ITEM SET VOLUME = VOLUME + ? WHERE PIN = ? ", [req.body.VOLUME, req.body.PIN], (err2, row2) => {
				if (err2) {
					console.log(err2);
				} else {
					res.send("success");
				}
			})
		}
	})
}
