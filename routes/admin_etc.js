exports.add = function(req, res, db) {
	db.query("SELECT DISTINCT MAIN FROM CATEGORY_LIST", (err, row) => {
		if (err) {
			console.log(err);
		} else {
			db.query("SELECT DISTINCT NAME FROM CAR_BRAND", (err2, row2) => {
				if(err2){
					console.log(err2);
				}else{
					db.query("SELECT DISTINCT NAME FROM ITEM_BRAND", (err3, row3) => {
						if(err3){
							console.log(err3);
						}else{
							var data = JSON.stringify(row);
							data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
							var data2 = JSON.stringify(row2);
							data2 = data2.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
							var data3 = JSON.stringify(row3);
							data3 = data3.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
							res.render("item_add.html", { category: data,carbrand:data2,itembrand:data3 });
						}
					})
				}
			})

		}
	})
}


exports.mainimg = function(req, res, db) {
	db.query("SELECT MAIN_IMG FROM MALLIMG WHERE IMG_SET = 'mall'",(err,row)=>{
		if(err){
			console.log(err);
			res.send(err);
		}else{
			res.render('mainimg.html',{img:row[0].MAIN_IMG});
		}
	})}


exports.shopimg = function(req, res, db) {
	db.query("SELECT * FROM MALLIMG", (err, row) => {
		if (err) {
			console.log(err);
		} else {
			var data = JSON.stringify(row);
			if (row === "") {
				data = {info: "noinfo"};
			}
			res.render('shopimg.html', {img_list: data});
		}
	})
}


exports.file_delete = function(req, res, db, fs) {
	db.query('SELECT FILE_LIST FROM ITEMINFO WHERE ITEM_NUM = ?', [req.body.pin], (err, row) => {
		if (err) {
			res.send(err);
		} else {
			var list = row[0].FILE_LIST.split(';');
			//console.log(list);
			//console.log(req.body.filename);
			var new_list = "";
			for (var i = 0; i < list.length; i++) {
				if (list[i] === req.body.filename) {
					fs.unlink("./public/stylesheet/img/item/" + list[i], (del_file_err) => {
						if (del_file_err) {
							console.log(err);
						} else {

						}
					})
					list.splice(i, 1);
					// console.log("list slice "+list);
					// console.log(list[i]);
					i = i - 1;
				} else if (list[i] !== "") {
					new_list = new_list + list[i] + ";";
				}
			}
			//console.log(new_list);
			db.query('UPDATE ITEMINFO SET FILE_LIST = ? WHERE ITEM_NUM = ?', [new_list, req.body.pin], (err2, row2) => {
				if (err2) {
					console.log(err2);
					res.send(err2);
				} else {
					res.send("success");
				}
			})
		}
	})
}


exports.img_delete = function(req, res, db, fs) {
	console.log(req.body);
	switch (req.body.img) {
		case "IMG1":
			db.query("UPDATE ITEMINFO SET IMG1 = 'no_img.png' WHERE ITEM_NUM = ?", [ req.body.pin], (err, row) => {
				if (err) {
					res.send("err");
					console.log(err);
				} else {
					fs.unlink("./public/stylesheet/img/item/" + req.body.name, (del_file_err) => {
						if (del_file_err) {
							console.log(err);
						} else {
							res.send("success");
						}
					})
				}
			})
			break;

		case "IMG2":
			db.query("UPDATE ITEMINFO SET IMG2 = 'no_img.png' WHERE ITEM_NUM = ?", [req.body.pin], (err, row) => {
				if (err) {
					res.send("err");
					console.log(err);
				} else {
					fs.unlink("./public/stylesheet/img/item/" + req.body.name, (del_file_err) => {
						if (del_file_err) {
							console.log(err);
						} else {
							res.send("success");
						}
					})
				}
			})
			break;

		case "IMG3":
			db.query("UPDATE ITEMINFO SET IMG3 = 'no_img.png' WHERE ITEM_NUM = ?", [req.body.pin], (err, row) => {
				if (err) {
					res.send("err");
					console.log(err);
				} else {
					fs.unlink("./public/stylesheet/img/item/" + req.body.name, (del_file_err) => {
						if (del_file_err) {
							console.log(err);
						} else {
							res.send("success");
						}
					})
				}
			})
			break;

		case "IMG4":
			db.query("UPDATE ITEMINFO SET IMG4 = 'no_img.png' WHERE ITEM_NUM = ?", [req.body.pin], (err, row) => {
				if (err) {
					res.send("err");
					console.log(err);
				} else {
					fs.unlink("./public/stylesheet/img/item/" + req.body.name, (del_file_err) => {
						if (del_file_err) {
							console.log(err);
						} else {
							res.send("success");
						}
					})
				}
			})
			break;

		case "IMG5":
			db.query("UPDATE ITEMINFO SET IMG5 = 'no_img.png' WHERE ITEM_NUM = ?", [ req.body.pin], (err, row) => {
				if (err) {
					res.send("err");
					console.log(err);
				} else {
					fs.unlink("./public/stylesheet/img/item/" + req.body.name, (del_file_err) => {
						if (del_file_err) {
							console.log(err);
						} else {
							res.send("success");
						}
					})
				}
			})
			break;
	}
}
