exports.show = function(req, res, db) {
	db.query("SELECT USER_ID,NAME,EMAIL,TOKEN,PHONE FROM USER", function (err, row) {
		if (err) {
			console.log(err);
		} else {
			var data = JSON.stringify(row);
			res.render("user.html", { data: data });
		}
	})
}


exports.delete = function(req, res, db) {
	console.log(req.body.id);
	db.query("DELETE FROM USER WHERE USER_ID = ?", [req.body.id], function (err, row) {
		if (err) {
			console.log(err);
			res.send("err");
		} else {

			res.send("success");
		}
	})
}


exports.change = function(req, res, db) {
	console.log(req.body);
	db.query("UPDATE USER SET NAME = ?, EMAIL = ?, PHONE = ? WHERE USER_ID=?", [req.body.name, req.body.email, req.body.phone, req.body.id], function (err, row) {
		if (err) {
			console.log(err);
			res.send("err");
		} else {
			res.send("success");
		}
	})
}
