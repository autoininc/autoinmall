exports.show = function(req, res, db) {
	var sess = req.session;
	db.query("SELECT DISTINCT NAME FROM CAR_BRAND", (err2, row2) => {
		if(err2){
			console.log(err2);
		}else{
			db.query("SELECT DISTINCT NAME FROM ITEM_BRAND", (err3, row3) => {
					if(err3){
						console.log(err3);
					}else{
						var data2 = JSON.stringify(row2);
						data2 = data2.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
						var data3 = JSON.stringify(row3);
						data3 = data3.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
						res.render("item_info.html", { category: sess.category,carbrand:data2,itembrand:data3 });
					}
				}
			)
		}
	})
}


exports.add = function(req, res, db, crypto) {
	// console.log("add");
	//console.log(req.body);
	//console.log(req.files);
	var item = req.body.item_name;
	var parts_num = req.body.parts_num;
	var price = req.body.item_price;
	var volume = Number(req.body.item_volume);
	//console.log("Number tesst: "+ volume);
	var mainc = req.body.category_main;
	var subc = req.body.category_sub;
	var desc = req.body.item_desc;
	var modelb = req.body.item_model;
	var manufc = req.body.car_brand;
	var itembrand = req.body.item_brand;
	var modeld = req.body.item_version;
	var manufi = req.body.item_manuf;
	var img = ["no_img.png", "no_img.png", "no_img.png", "no_img.png", "no_img.png"];
	if (req.files['item_img']) {
		for (var i = 0; i < req.files['item_img'].length; i++) {
			img[i] = req.files['item_img'][i].filename;
		}
	}

	var u_salt = Math.round((new Date().valueOf() * Math.random())) + "";
	var hashnum = crypto.createHash("sha256").update(item + u_salt).digest("hex");
	var pin = "AM" + String(hashnum);
	if (req.files['file']) {
		var file_list = "";
		for (var j = 0; j < req.files['file'].length; j++) {
			file_list = file_list + req.files['file'][j].filename + ';';
		}
	}
	var c_data = {
		IMG1: img[0],
		IMG2: img[1],
		IMG3: img[2],
		IMG4: img[3],
		IMG5: img[4],
		FILE_LIST: file_list,
		MAIN_C: mainc,
		SUB_C: subc,
		BASE_M: modelb,
		DETAIL_M: modeld,
		CAR_M: manufc,
		ITEM_M: manufi,
		ITEM_NUM: pin,
		BRAND_I: itembrand
	}
	var data = {
		ITEM_NAME: item,
		PARTS_NUM: parts_num,
		PIN: pin,
		PRICE: price,
		VOLUME: volume,
		ITEM_DESC: desc,
		RATE: 3
	}
	db.query("INSERT INTO ITEM SET ?", data, function (err2, row2) {
		if (err2) {
			console.log(err2);
		} else {
			db.query("INSERT INTO ITEMINFO SET ?", c_data, function (err3, row3) {
				if (err3) {
					console.log("err3: " + err3);
				} else {
					res.send(pin);
				}
			})
		}
	})
}


exports.delete = function(req, res, db, fs) {
	console.log(req.body);
	var img_list = ["", "", "", "", ""];
	//delete item img
	db.query("SELECT IMG1,IMG2,IMG3,IMG4,IMG5,FILE_LIST FROM ITEMINFO WHERE ITEM_NUM = ?", [req.body.pin], (err, row) => {
		if (err) {
			console.log(err);
		} else {
			console.log(row);
			img_list[0] = row[0].IMG1;
			img_list[1] = row[0].IMG2;
			img_list[2] = row[0].IMG3;
			img_list[3] = row[0].IMG4;
			img_list[4] = row[0].IMG5;
			console.log(img_list);
			if(row[0].FILE_LIST){
				var file_list = row[0].FILE_LIST.split(";");
				for (var j = 0; j < file_list.length; j++) {
					fs.unlink("./public/img/item/" + file_list[i], (del_file_err) => {
						if (del_file_err) {
							console.log(err);
						} else {
							console.log("success");
						}
					})
				}
			}

			db.query("DELETE FROM ITEMINFO WHERE ITEM_NUM = ?", [req.body.pin], function (err2, row2) {
				if (err2) {
					console.log(err2);
				} else {
					db.query("DELETE FROM ITEM WHERE PIN = ?", [req.body.pin], function (err3, row3) {
						if (err3) {
							console.log(err3);
						} else {
							for (var i = 0; i < 5; i++) {
								if (img_list[i] !== "no_img.png") {
									fs.unlink("./public/img/item/" + img_list[i], (del_err) => {
										if (del_err) {
											console.log(err);
										} else {
											console.log("success");
										}
									})
								}
							}
							res.send("success");
						}
					})
				}
			})
		}
	})
}


exports.search = function(req, res, db) {
	db.query("SELECT * FROM ITEMINFO,ITEM WHERE PIN = ITEM_NUM AND PIN = ?", [req.body.pin], function (err, row) {
		if (err) {
			console.log(err);
		} else {
			res.send(row);
		}
	})
}


exports.setting = function(req, res, db) {
	console.log(req.body);
	console.log(req.files);
	var filelist=req.body.filelist;
	var img = ["no_img.png", "no_img.png", "no_img.png", "no_img.png", "no_img.png"];
	var imglist = req.body.imglist.split(";");
	var imgnamelist = req.body.imgnamelist.split(";");
	for(var i=0;i<imglist.length;i++){
		if(imglist[i] === "img1"){
			img[0] = imgnamelist[i];
		}else if(imglist[i] === "img2"){
			img[1] = imgnamelist[i];
		}else if(imglist[i] === "img3"){
			img[2] = imgnamelist[i];
		}else if(imglist[i] === "img4"){
			img[3] = imgnamelist[i];
		}else if(imglist[i] === "img5"){
			img[4] = imgnamelist[i];
		}
	}
	if(req.files.img){
		for(var l=0;l<req.files.img.length;l++){
			for(var k=0;k<5;k++){
				if(img[k]==="no_img.png"){
					img[k] = req.files.img[l].filename;
					break;
				}
			}

		}
	}
	console.log(img);
	if(req.files.file){

		for(var j=0;j<req.files.file.length;j++){
			filelist = filelist+req.files.file[j].filename+";";
		}
	}
	console.log(filelist);
	var data = {
		ITEM_NAME: req.body.name,
		PARTS_NUM: req.body.parts_num,
		PRICE: req.body.price,
		VOLUME: Number(req.body.volume),
		ITEM_DESC: req.body.item_desc
	}
	var c_data = {
		IMG1: img[0],
		IMG2: img[1],
		IMG3: img[2],
		IMG4: img[3],
		IMG5: img[4],
		FILE_LIST:filelist,
		BRAND_I: req.body.item_brand,
		MAIN_C: req.body.category_main,
		SUB_C: req.body.category_sub,
		BASE_M: req.body.item_model,
		DETAIL_M: req.body.item_version,
		CAR_M: req.body.car_brand,
		ITEM_M: req.body.item_manuf,
	}
	db.query("UPDATE ITEM SET ? WHERE PIN = ?", [data, req.body.pin], function (err, row) {
		if (err) {
			console.log(err);
		} else {
			db.query("UPDATE ITEMINFO SET ? WHERE ITEM_NUM = ?", [c_data, req.body.pin], function (err2, row2) {
				if (err2) {
					console.log(err2)
				} else {
					res.send("success setting");
				}
			})

		}
	})
}
