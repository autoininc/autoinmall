exports.show = function (req, res, db) {
	db.query("SELECT * FROM ITEM_BRAND", (err, row) => {
		if (err) {
			console.log(err);
		} else {
			var data = JSON.stringify(row);
			res.render("item_brand.html", {data: data});
		}
	})
}


exports.add = function (req, res, db) {
	if (req.file) {
		var data = {
			NAME: req.body.name,
			IMG: req.file.filename,
			COUNTRY: req.body.country,
			CITY: req.body.city,

		}
	} else {
		var data = {
			NAME: req.body.name,

			COUNTRY: req.body.country,
			CITY: req.body.city,

		}
	}

	db.query("INSERT INTO ITEM_BRAND SET ?", [data], (err, row) => {
		if (err) {
			console.log(err);
			res.send("fail");
		} else {
			res.send("success");
		}
	})
}


exports.delete = function (req, res, db, fs) {
	db.query("DELETE FROM ITEM_BRAND WHERE NAME = ?", [req.body.name], (err, row) => {
		if (err) {
			console.log(err);
		} else {
			//delete item brand img
			fs.unlink("./public/img/item_brands/" + req.body.img, (err2) => {
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
	if (req.file !== null) {
		db.query("UPDATE ITEM_BRAND SET CITY = ?, COUNTRY = ?, IMG = ? WHERE NAME = ?", [req.body.city, req.body.country, req.file.filename, req.body.name], (err, row) => {
			if (err) {
				console.log(err);
				res.send("update error");
			} else {
				res.send(req.file.filename);
			}
		})
	} else {
		db.query("UPDATE ITEM_BRAND SET CITY = ?, COUNTRY = ? WHERE NAME = ?", [req.body.city, req.body.country, req.body.name], (err, row) => {
			if (err) {
				console.log(err);
				res.send("update error");
			} else {
				res.send("update success without img");
			}
		})
	}
}
