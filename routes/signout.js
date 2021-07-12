exports.do = function (req, res, db) {
	req.session.destroy(function () {
		req.session;
	});
	res.redirect('/');
}
