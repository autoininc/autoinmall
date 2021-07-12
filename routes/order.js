exports.show = function (req, res, db) {
	var sess = req.session;
	var date = new Date();
	db.query("SELECT DISTINCT ITEM, VOLUME, PRICE, PARTS_NUM, PIN FROM CART WHERE ID = ? AND CART_ID = 'before'", [sess.userid], (err, row) => {
		if (err) {
			console.log(err);
		} else {
			var data = JSON.stringify(row);
			db.query("SELECT ZIPCODE,ADDRESS FROM USER WHERE USER_ID = ?", [sess.userid], (err2, row2) => {
				if (err2) {
					console.log(err2);
				} else {
					var dest = JSON.stringify(row2);
					res.render("order.html", {username: sess.username, cart: data, email: sess.email, dest: dest});
				}
			})
		}
	})
}
