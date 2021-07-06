exports.certification = function(req, res, db) {
	// console.log("setting");
	var attr = req.body;
	console.log(attr);
	if(attr.orgemail === attr.useremail){
		if (!isNaN(attr.userphone) && !isNaN(attr.userzipcode)) {
			db.query("UPDATE USER SET NAME = ?, PHONE=?, ADDRESS=?, ZIPCODE=? WHERE USER_ID = ?", [attr.username,attr.userphone, attr.useraddress, attr.userzipcode, attr.userid], function (err, row) {
				if (err) {
					console.log(err);
				} else {
					sess = req.session;
					sess.username = attr.username;
					res.send("success");
				}
			})
		}else{
			console.log("wrong form");
			res.send("err");
		}
	}else{
		db.query("UPDATE USER SET LOCK_ACC = 0 WHERE USER_ID = ?", [attr.userid], function (err, row) {
			if (err) {
				console.log(err);
			} else {
				var data = {
					fromEmail: 'service@autoinmall.com',
					toEmail: attr.useremail,
					subject: "Email Verification-AutoinMall",
					html:
						"<p>Please click this button to certification e-mail</p>" +
						"<a href='https://autoinmall.com/account/setting?email="+attr.useremail+"&id="+attr.userid+"' target = '_blank'><img src = 'https://ifh.cc/g/bXCkYZ.png' style='width:300px;height:100px'></a>" +
						"<p>Thank you</p>" +
						"<p>Autoinmall</p>"
				};
				nodemailer.sendmail(data, () => {
					//res.send("");
				});
				res.send("success");
			}
		})
	}
}

exports.setting = function(req, res, db) {
	var id = req.query.id;
	var email = req.query.email;
	db.query("UPDATE USER SET LOCK_ACC = 1, EMAIL = ? WHERE  AND USER_ID = ?", [email,id], function (err, row) {
		if (err) {
			console.log(err);
		} else {
			location.href("/");
		}
	})
}


exports.password = function(req, res, db) {
	var data = req.body;
	//hash salt
	var u_salt = Math.round((new Date().valueOf() * Math.random())) + "";
	//password hashing
	var hashPassword = crypto.createHash("sha512").update(data.pw + u_salt).digest("hex");
	console.log(hashPassword);
	db.query("UPDATE USER SET USER_PW = ?, SALT=? WHERE USER_ID = ?", [hashPassword, u_salt, data.id], function (err, row) {
		if (err) {
			console.log(err);
		} else {
			console.log(row);
			res.send("success");
		}
	})
}
