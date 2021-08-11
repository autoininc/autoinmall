exports.change = function (req, res, db) {
	var img1;
	var img2;
	var img3;
	if (req.files) {
		if (req.files[0]) {img1 = req.files[0].filename;} else {img1 = req.body.org1}
		if (req.files[1]) {img2 = req.files[1].filename;} else {img2 = req.body.org2}
		if (req.files[2]) {img3 = req.files[2].filename;} else {img3 = req.body.org3}
		console.log(req.files);
		db.query("UPDATE MALLIMG SET IMG1 = ?, IMG2 = ?, IMG3 = ?,URL1 = ?, URL2 = ?, URL3 = ? WHERE IMG_SET = 'mall'", [img1, img2, img3, req.body.url1, req.body.url2, req.body.url3], (err, row) => {
			if (err) {
				console.log(err);
				res.send("err");
			} else {
				res.send("success");
			}
		})
	} else {
		res.send("err");
	}

}
