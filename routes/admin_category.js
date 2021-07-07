exports.show = function(req, res, db) {
	db.query("SELECT * FROM CATEGORY_LIST ORDER BY MAIN", function (err, row) {
		if (err) {
			console.log(err);
		} else {
			var data = JSON.stringify(row);
			data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
			res.render("category.html", { data: data });
		}
	})
}


exports.add = function(req, res, db) {
	db.query("INSERT INTO CATEGORY_LIST SET MAIN = ?, SUB = ?, ID = ?", [req.body.MAIN, req.body.SUB, req.body.MAIN + "_" + req.body.SUB], function (err, row) {
		if (err) {
			console.log(err);
		} else {
			res.send("success");
		}
	})
}


exports.delete_main = function(req, res, db) {
	console.log(req.body);
	db.query("DELETE FROM CATEGORY_LIST WHERE MAIN = ?", [req.body.MAIN], function (err, row) {
		if (err) {
			console.log(err);
		} else {
			res.send("success");
		}
	})
}


exports.delete_sub = function(req, res, db) {
	db.query("DELETE FROM CATEGORY_LIST WHERE ID = ?", [req.body.MAIN + "_" + req.body.SUB], function (err, row) {
		if (err) {
			console.log(err);
		} else {
			res.send("success");
		}
	})
}
