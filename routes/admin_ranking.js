exports.show = function(req, res, db) {
	db.query("SELECT * FROM RANKING",(err,row)=>{
		if(err){
			console.log(err);
		}else{
			//console.log(row);
			var data = JSON.stringify(row);
			res.render("ranking.html",{data:data});
		}
	})
}


exports.add = function(req, res, db) {
	// console.log(req.body);
	var data={
		THEME: req.body.theme,
		TOP1: req.body.top1,
		TOP2: req.body.top2,
		TOP3: req.body.top3,
	}
	db.query("INSERT INTO RANKING SET ?",[data],(err,row)=>{
		if(err){
			console.log(err);
		}else{
			res.send("success");
		}
	})
}


exports.delete = function(req, res, db) {
	db.query("DELETE FROM RANKING WHERE THEME = ?",[req.body.theme],(err,row)=>{
		if(err){
			console.log(err);
		}else{
			res.send("success");
		}
	})
}


exports.setting = function(req, res, db) {
	var data = {
		TOP1: req.body.top1,
		TOP2: req.body.top2,
		TOP3: req.body.top3,
		TOP4: req.body.top4,
		TOP5: req.body.top5,
	}
	db.query("UPDATE RANKING SET ? WHERE THEME = ?",[data,req.body.theme],(err,row)=>{
		if(err){
			console.log(err);
		}else{
			res.send("success");
		}
	})
}
