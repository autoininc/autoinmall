async function checkEmail(nodemailer, param) {
	var data = {
		fromEmail: "service@autoinmall.com",
		toEmail: param.EMAIL,
		subject: "Email Verification-AutoinMall",
		html: "<p>Hello " + param.NAME + "</p>" +
			"<p>Thank you for sign up to AutoinMall!</p>" +
			"<p>Please use the verification button below to confirm your email address</p>" +
			"<a href='https://autoinmall.com/signup/checkaccount?email=" + param.EMAIL + "&id=" + param.ID + "' target = '_blank'><img src = 'https://ifh.cc/g/bXCkYZ.png' style='width:300px;height:100px'></a>" +
			"<p>Thank you</p>" +
			"<p>Autoinmall</p>"

	};
	await nodemailer.sendmail(data);
}



exports.show = function (req, res, db) {
	res.render("signup.html");
}


exports.checkaccount = function (req, res, db) {
	var email = req.query.email;
	var id = req.query.id;
	db.query("UPDATE USER SET LOCK_ACC = 1 WHERE USER_ID = ? AND EMAIL = ?", [id, email], async function (err, row) {
		if (err) {
			console.log(err);
		} else {
			//insert signup email
			await res.redirect("/");
		}

	})
}


exports.confirm = function (req, res, db, crypto, nodemailer) {
	var data = req.body;
	//sign up data
	var userId = data.userId;
	var userPw = data.userPw;
	var userName = data.userName;
	var userEmail = data.userEmail;
	var userPhone = data.userPhone;
	var userZipcode = data.userZipcode;
	var userAddress = data.userAddress;
	var usertoken = 0;
	//hash salt
	var u_salt = Math.round((new Date().valueOf() * Math.random())) + "";
	//password hashing
	var hashPassword = crypto.createHash("sha512").update(userPw + u_salt).digest("hex");

	var userInfo = {
		USER_ID: userId,
		USER_PW: hashPassword,
		EMAIL: userEmail,
		SALT: u_salt,
		NAME: userName,
		PHONE: userPhone,
		ZIPCODE: userZipcode,
		ADDRESS: userAddress,
		TOKEN: usertoken,
		LOCK_ACC: 0
	};

	db.query("INSERT INTO USER SET ?", userInfo, function (err, row, fields) {
		if (err) {
			console.log(err);

		} else {
			var data = {
				EMAIL: userEmail,
				NAME: userName,
				ID: userId
			}
			checkEmail(nodemailer, data);
			res.send("success");
		}

	})
}


exports.overlap = function (req, res, db) {
	var checkId = req.body.userId;
	db.query("SELECT USER_ID FROM USER WHERE USER_ID = ?", [checkId], function (err, row, fields) {
		if (err) {
			console.log(err);
		} else {
			if (row[0] == null) {
				res.send("ok");
			} else {
				res.send("fail");
			}


		}

	})
	//send true false
}


exports.effectiveness = function (req, res, db) {
	var attr = req.body;
	var id = attr.id;
	var pw = attr.pw;
	var c_p = attr.c_p;
	var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
	var koreancheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	if (false == reg.test(pw)) {
		//error all
		res.send("errortype1");
	} else if (/(\w)\1\1\1/.test(pw)) {
		//length error
		res.send("errortype2");

	} else if (pw.search(id) > -1) {
		//pw have id error
		res.send("errortype3");

	} else if (pw.search(/\s/) != -1) {
		//blank error
		res.send("errortype4");

	} else if (koreancheck.test(pw)) {
		//korean error
		res.send("errortype5");

	} else if (c_p == pw) {
		//success
		res.send("errortype0");
	} else {
		res.send("errortype6");
	}
}
