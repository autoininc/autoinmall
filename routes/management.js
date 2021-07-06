exports.show = function(req, res, db) {
	var sess = req.session;
	if (sess.token === 0) {
		db.query("SELECT * FROM USER WHERE USER_ID=?", [sess.userid], function (err, row) {
			if (err) {
				console.log(err);
			} else {
				res.render("account.html", {
					username: sess.username,
					userid: row[0].USER_ID,
					userpw: row[0].USER_PW,
					userphone: row[0].PHONE,
					useremail: row[0].EMAIL,
					useraddress: row[0].ADDRESS,
					userzipcode: row[0].ZIPCODE
				});
			}
		})
	} else if (sess.token === 1) {
		res.render("admin.html", { username: sess.username });
	}
}
