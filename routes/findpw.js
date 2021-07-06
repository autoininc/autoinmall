exports.show = function(req, res, db) {
	sess = req.session
	res.render("findpw.html", { username: sess.username, info: "undefined" });
}
