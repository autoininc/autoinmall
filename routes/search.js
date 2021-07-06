exports.do = function(req, res, db) {
	var sess = req.session;
	var category = String(req.query.category).split("_");
	var main = category[0];
	var sub = category[1];
	var brand = req.query.brands;
	sess.carmanufacturer = brand;
	var model = req.query.model;
	var version = req.query.version;
	var parts_num = req.query.parts_num;
	var itembrand = req.query.itembrand;
	db.query("SELECT NAME FROM CAR_BRAND",(err_brand,row_brand)=>{
		if(err_brand){
			console.log(err_brand);
		}else{
			var carbrand = JSON.stringify(row_brand);
			carbrand = carbrand.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
			db.query("SELECT * FROM MALLIMG",(mallimg_err,mallimg_row)=>{
				if(mallimg_err){
					console.log(mallimg_err);
				}else{
					var mallimg = JSON.stringify(mallimg_row);
					if (itembrand) {
						//itembrand
						db.query("SELECT * FROM ITEM, ITEMINFO WHERE PIN = ITEM_NUM AND BRAND_I = ?", [itembrand], function (err, row) {
							if (err) {
								console.log(err);
							} else {
								//  console.log(itembrand+"\n"+row[0]);
								var data = JSON.stringify(row);
								data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
								res.render("shop.html", { username: sess.username, info: data, category: sess.category,carbrand:carbrand,img_list:mallimg});
							}
						})
					}
					else {

						if (parts_num) {
							//parts_num
							db.query("SELECT * FROM ITEM, ITEMINFO WHERE PIN = ITEM_NUM AND PARTS_NUM = ?", [parts_num], function (err, row) {
								if (err) {
									console.log(err);
								} else {
									var data = JSON.stringify(row);
									data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
									res.render("shop.html", { username: sess.username, info: data, category: sess.category,carbrand:carbrand,img_list:mallimg });
								}
							})
						}
						else if (!req.query.category) {
							if (!model) {
								//brand

								db.query("SELECT * FROM ITEM, ITEMINFO WHERE PIN = ITEM_NUM AND CAR_M = ?", [brand], function (err, row) {
									if (err) {
										console.log(err);
									} else {
										var data = JSON.stringify(row);
										data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
										res.render("shop.html", { username: sess.username, info: data, category: sess.category,carbrand:carbrand,img_list:mallimg });
									}
								})

							} else if (!version) {
								//brand & model
								db.query("SELECT * FROM ITEM, ITEMINFO WHERE PIN = ITEM_NUM AND CAR_M = ? AND BASE_M = ? ", [brand, model], function (err, row) {
									if (err) {
										console.log(err);
									} else {
										var data = JSON.stringify(row);
										data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
										res.render("shop.html", { username: sess.username, info: data, category: sess.category,carbrand:carbrand ,img_list:mallimg});
									}
								})

							} else {
								//brand & model & version
								db.query("SELECT * FROM ITEM, ITEMINFO WHERE PIN = ITEM_NUM AND CAR_M = ? AND BASE_M = ? AND DETAIL_M = ?", [brand, model, version], function (err, row) {
									if (err) {
										console.log(err);
									} else {
										var data = JSON.stringify(row);
										data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
										res.render("shop.html", { username: sess.username, info: data, category: sess.category,carbrand:carbrand,img_list:mallimg });
									}
								})
							}
						} else {
							if (!brand) {
								//category
								db.query("SELECT * FROM ITEM, ITEMINFO WHERE PIN = ITEM_NUM AND MAIN_C = ? AND SUB_C = ? ", [main, sub], function (err, row) {
									if (err) {
										console.log(err);
									} else {
										var data = JSON.stringify(row);
										data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
										res.render("shop.html", { username: sess.username, info: data, category: sess.category,carbrand:carbrand,img_list:mallimg });
									}
								})
							}
							else if (!model) {
								//brand & category
								db.query("SELECT * FROM ITEM, ITEMINFO WHERE PIN = ITEM_NUM AND MAIN_C = ? AND SUB_C = ? AND CAR_M = ? ", [main, sub, brand], function (err, row) {
									if (err) {
										console.log(err);
									} else {
										var data = JSON.stringify(row);
										data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
										res.render("shop.html", { username: sess.username, info: data, category: sess.category,carbrand:carbrand,img_list:mallimg });
									}
								})

							} else if (!version) {
								//brand & model & category
								db.query("SELECT * FROM ITEM, ITEMINFO WHERE PIN = ITEM_NUM AND MAIN_C = ? AND SUB_C = ? AND CAR_M = ? AND BASE_M = ? ", [main, sub, brand, model], function (err, row) {
									if (err) {
										console.log(err);
									} else {
										var data = JSON.stringify(row);
										data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
										res.render("shop.html", { username: sess.username, info: data, category: sess.category,carbrand:carbrand,img_list:mallimg });
									}
								})

							} else {
								//brand & model & version & category
								db.query("SELECT * FROM ITEM, ITEMINFO WHERE PIN = ITEM_NUM AND MAIN_C = ? AND SUB_C = ? AND CAR_M = ? AND BASE_M = ? AND DETAIL_M = ?", [main, sub, brand, model, version], function (err, row) {
									if (err) {
										console.log(err);
									} else {
										var data = JSON.stringify(row);
										data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
										res.render("shop.html", { username: sess.username, info: data, category: sess.category,carbrand:carbrand,img_list:mallimg });
									}
								})
							}
						}

					}
				}
			})

		}
	})
}
