exports.model = function(req, res, db) {
	var brand = req.body.brand;
	db.query("SELECT DISTINCT BASE_M FROM ITEMINFO WHERE CAR_M = ?", [brand], function (err, row) {
		if (err) {
			console.log(err);
		} else {

			res.send(row);
		}
	})
}

exports.version = function(req, res, db) {
	var brand = req.body.brand;
	var model = req.body.model;
	db.query("SELECT DISTINCT DETAIL_M FROM ITEMINFO WHERE CAR_M = ? AND BASE_M = ?", [brand, model], function (err, row) {
		if (err) {
			console.log(err);
		} else {
			res.send(row);
		}
	})
}
