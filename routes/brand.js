exports.show = function(req, res, db) {
	var sess = req.session;
	db.query("SELECT NAME,IMG FROM CAR_BRAND", (err, row) => {
		if (err) {
			console.log(err);
		} else {
			var data = JSON.stringify(row);
			res.render("brand.html", { username: sess.username, carbrand: data });
		}
	})
}
