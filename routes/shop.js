exports.show = function(req, res, db) {
	//  console.log("get shop");
	sess = req.session;
	sess.carmanufacturer = null;
	var page = req.query.page;
	// console.log(page);
	db.query("SELECT ID FROM CATEGORY_LIST", (err, row) => {
		if (err) {
			console.log(err);
		} else {
			db.query("SELECT NAME FROM CAR_BRAND",(err_brand,row_brand)=>{
				if(err_brand){
					console.log(err_brand);
				}else{
					var carbrand = JSON.stringify(row_brand);
					carbrand = carbrand.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
					var category = JSON.stringify(row);
					sess = req.session;
					sess.category = category;
					db.query("SELECT * FROM ITEM,ITEMINFO WHERE PIN = ITEM_NUM",(err2,row2)=>{
						if(err2){
							console.log(err3);
						}else{
							// console.log(row2);
							var data2 = JSON.stringify(row2);
							data2 = data2.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
							db.query("SELECT * FROM MALLIMG",(mallimg_err,mallimg_row)=>{
								if(mallimg_err){
									console.log(mallimg_err);
								}else{
									var mallimg = JSON.stringify(mallimg_row);
									res.render("shop.html", { username: sess.username, info: data2, category: sess.category,carbrand:carbrand,img_list:mallimg });
								}
							})
						}
					})
				}
			})
		}
	})
}


exports.item = function(req, res, db) {
	//console.log("get");
	sess = req.session;
	var main = req.query.main;
	var sub = req.query.sub;
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
					// console.log(mallimg);
					if (sess.carmanufacturer) {
						db.query("SELECT * FROM ITEM,ITEMINFO WHERE PIN = ITEM_NUM AND MAIN_C = ? AND SUB_C = ? AND CAR_M = ?", [main, sub, sess.carmanufacturer], function (err, row) {
							if (err) {
								console.log(err);
							} else {
								var data = JSON.stringify(row)
								data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
								res.render("shop.html", { username: sess.username, info: data, category: sess.category,carbrand:carbrand,img_list:mallimg });
							}
						})
					} else {
						db.query("SELECT * FROM ITEM,ITEMINFO WHERE PIN = ITEM_NUM AND MAIN_C = ? AND SUB_C = ?", [main, sub], function (err, row) {
							if (err) {
								console.log(err);
							} else {
								var data = JSON.stringify(row)
								data = data.replace(/\\r/gi, '').replace(/\\n/gi, '<br>').replace(/\\t/gi, '_&nbsp;').replace(/\\f/gi, ' ');
								res.render("shop.html", { username: sess.username, info: data, category: sess.category ,carbrand:carbrand ,img_list:mallimg});
							}
						})
					}
				}
			})
		}
	})
}
