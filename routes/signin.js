exports.show = function(req, res, db) {
	var sess = req.session;
	res.render("signin.html", { flag: '', username: sess.username });
}

exports.confirm = function(req, res, db) {
	console.log(req.body);
	var userid = req.body.userId;
	var userpw = req.body.userPw;
	db.query("SELECT * FROM USER WHERE USER_ID = ?", [userid], function (err, row, fields) {
		if (err) {
			console.log("err:" + err);
		}
		else {
			console.log(row);
			if (row == "") {
				//console.log("err: emtpy set");
				res.send("signin fail:wrong Id#");
			} else {
				if (row[0].LOCK_ACC == 1) {
					var salt = row[0].SALT;
					var pw = row[0].USER_PW;
					var name = row[0].NAME;
					var hashPassword = crypto.createHash("sha512").update(userpw + salt).digest("hex");
					if (hashPassword === pw) {
						//   console.log("signin success");
						sess = req.session;
						sess.username = name;
						sess.userid = userid;
						sess.email = row[0].EMAIL;
						sess.token = row[0].TOKEN;
						console.log(name);
						res.send(name);

					} else {
						// console.log("fail");
						res.send("signin fail:wrong password$");
					}
				} else {
					res.send("signin fail:check Email first@");
				}


			}

		}
	})
}