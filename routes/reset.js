exports.password = function(req, res, db, crypto, nodemailer) {
	var sess = req.session;
	console.log(req.body);

	db.query("SELECT EMAIL,SALT FROM USER WHERE USER_ID = ?",[req.body.id],(err,row)=>{
		if(err){
			res.send("Please check your ID");
		}else{
			if(!row[0]){
				res.send("Please check your ID");
			}else{
				if(row[0].EMAIL === req.body.to){
					var ranNum = Math.floor(Math.random()*((1024*1024)+1)).toString(); //0~1024*1024
					console.log(ranNum);
					db.query("UPDATE USER SET USER_PW = ? WHERE USER_ID = ?",[crypto.createHash("sha512").update(ranNum + row[0].SALT).digest("hex"),req.body.id],(err2,row2)=>{
						if(err2){
							res.send("Reset Password error");
						}else{
							var data = {
								fromEmail: req.body.from,
								toEmail: req.body.to,
								subject: "Email Verification-AutoinMall",
								html:
									"<p>Your password has been set to <strong>"+ranNum+"</strong></p>" +
									"<a href='https://autoinmall.com' target = '_blank'><img src = 'https://ifh.cc/g/bXCkYZ.png' style='width:300px;height:100px'></a>" +
									"<p>Thank you</p>" +
									"<p>Autoinmall</p>"
							};
							nodemailer.sendmail(data, () => {
								res.send("");
							});
						}
					})

				}else{
					res.send("Please check your E-mail");
				}
			}


		}
	})
}
