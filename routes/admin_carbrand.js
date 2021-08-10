exports.show = function (req, res, db) {
	db.query("SELECT * FROM CAR_BRAND", (err, row) => {
		if (err) {
			console.log(err);
		} else {
			var data = JSON.stringify(row);
			res.render("car_brand.html", {data: data});
		}
	});
}


exports.add = function (req, res, db) {
	if (req.file) {
		var data = {
			NAME: req.body.name,
			IMG: req.file.filename,
		}
	} else {
		var data = {
			NAME: req.body.name,

		}
	}
	db.query("INSERT INTO CAR_BRAND SET ?", [data], (err, row) => {
		if (err) {
			console.log(err);
			res.send('fail');
		} else {
			res.send("success");
		}
	})
}


exports.delete = function (req, res, db, fs) {
	db.query("DELETE FROM CAR_BRAND WHERE NAME = ?", [req.body.name], (err, row) => {
		if (err) {
			console.log(err);
		} else {
			//delete car brand img
			fs.unlink("./public/img/car_brands/" + req.body.img, (err2) => {
				if (err2) {
					console.log(err2);
				} else {
					res.send("success");
				}
			})

		}
	})
}


exports.change = function (req, res, db) {
	if (req.file != null) {
		db.query("UPDATE CAR_BRAND SET IMG = ? WHERE NAME = ?", [req.file.filename, req.body.name], (err, row) => {
			if (err) {
				console.log(err);
				res.send("update error");
			} else {
				res.send(req.file.filename);
			}
		})
	} else {
		res.send("no chage");
	}
}
