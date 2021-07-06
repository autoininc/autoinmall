exports.do = function(req, res, db) {
	req.session.destroy(function () {
		//  console.log("kill session");
		req.session;
		console.log(req.session);
	});
	res.redirect('/');
}
