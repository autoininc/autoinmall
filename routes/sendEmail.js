module.exports = async function checkEmail(nodemailer, param) {
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
