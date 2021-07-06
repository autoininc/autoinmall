exports.do = function(req, res, db) {
	var filename = req.query.file;
	var pin = req.query.pin;
	res.download("./public/stylesheet/img/item/" + filename);
}
