exports.show = function (req, res, db) {
	db.query("SELECT ID FROM CATEGORY_LIST", (err, row) => {
		if (err) {
			console.log(err);
		} else {
			var category = JSON.stringify(row);
			sess = req.session;
			sess.category = category;
			db.query("SELECT NAME,IMG FROM ITEM_BRAND", (err2, row2) => {
				if (err2) {
					console.log(err2);
				} else {
					var data = JSON.stringify(row2);
					db.query("SELECT NAME,IMG FROM CAR_BRAND", (err3, row3) => {
						if (err3) {
							console.log(err3);
						} else {
							var car = JSON.stringify(row3);
							db.query("SELECT THEME,TOP1,TOP2,TOP3,TOP4,TOP5,ITEM_NAME,IMG1,PIN FROM ITEM JOIN RANKING ON (PIN = TOP1 OR PIN = TOP2 OR PIN = TOP3 OR PIN = TOP4 OR PIN = TOP5) JOIN ITEMINFO ON PIN = ITEM_NUM ORDER BY THEME", (err4, row4) => {
								if (err4) {
									console.log(err4);
								} else {

									var ranking = JSON.stringify(row4);
									db.query("SELECT MAIN_IMG FROM MALLIMG WHERE IMG_SET = 'mall'", (err5, row5) => {
										if (err5) {
											console.log(err5);
										} else {
											var main_img = row5[0].MAIN_IMG;
											res.render('index.html', {username: sess.username, category: sess.category, itembrand: data, carbrand: car, ranking: ranking, main_img: main_img});
										}
									})

								}
							})

						}
					})

				}
			})

		}
	})
}
