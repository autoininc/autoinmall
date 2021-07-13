exports.show = function (req, res, db) {
	db.query(`SELECT THEME,TOP1,TOP2,TOP3,TOP4,TOP5,ITEM_NAME,IMG1,PIN FROM ITEM JOIN RANKING ON (PIN in (TOP1, TOP2, TOP3, TOP4, TOP5)) JOIN ITEMINFO ON PIN = ITEM_NUM ORDER BY THEME;`, (err, row) => {
		if (err) console.log(err);
		else {
			var arr = {name: [], imgPath: [], pin: []};
			var data = JSON.parse(JSON.stringify(row));
			for (var i = 0; i < 15; i++) {
				var rank = `TOP${i % 5 + 1}`;
				for (var j = 0; j < 15; j++) {
					if (data[j]['PIN'] === data[i][rank]) {
						arr['name'].push(data[j]['ITEM_NAME']);
						arr['imgPath'].push(`/img/item/${data[j]['IMG1']}`);
						arr['pin'].push(data[j]['PIN']);
						break;
					}
				}
			}
			res.render("ranking.html", {data: JSON.stringify(arr)});
		}
	})
}


exports.add = function (req, res, db) {
	var data = {
		THEME: req.body.theme,
		TOP1: req.body.top1,
		TOP2: req.body.top2,
		TOP3: req.body.top3,
		TOP4: req.body.top4,
		TOP5: req.body.top5
	}
	db.query("INSERT INTO RANKING SET ?", [data], (err, row) => {
		if (err) {
			console.log(err);
		} else {
			res.send("success");
		}
	})
}


exports.delete = function (req, res, db) {
	db.query("DELETE FROM RANKING WHERE THEME = ?", [req.body.theme], (err, row) => {
		if (err) {
			console.log(err);
		} else {
			res.send("success");
		}
	})
}


exports.setting = function (req, res, db) {
	var data = {
		TOP1: req.body.top1,
		TOP2: req.body.top2,
		TOP3: req.body.top3,
		TOP4: req.body.top4,
		TOP5: req.body.top5,
	}
	db.query("UPDATE RANKING SET ? WHERE THEME = ?", [data, req.body.theme], (err, row) => {
		if (err) {
			console.log(err);
		} else {
			res.send("success");
		}
	})
}
