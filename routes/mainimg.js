exports.change = function(req, res, db) {
	console.log(req.file);
	console.log(req.body);
	var img1;
	if(req.file){
		img1 = '../../img/mall/'+req.file.filename;
	}else{
		img1 = req.body.org1
	}
	db.query("UPDATE MALLIMG SET MAIN_IMG = ? WHERE IMG_SET = 'mall'",[img1],(err,row)=>{
		if(err){
			console.log(err);
			res.send("err");
		}else{
			res.send("success");
		}
	})
}
