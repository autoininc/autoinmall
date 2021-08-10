module.exports = function (db) {

	var express = require('express');
	var router = express.Router();

	var multer = require('multer');
	var crypto = require('crypto');
	var nodemailer = require('../mail/mail');

	var account = require('./account');
	var brand = require('./brand');
	var cart = require('./cart');
	var download = require('./download');
	var findpw = require('./findpw');
	var home = require('./home');
	var item = require('./item');
	var mainimg = require('./mainimg');
	var management = require('./management');
	var order = require('./order');
	var payments = require('./payments');
	var receipt = require('./receipt');
	var reset = require('./reset');
	var review = require('./review');
	var search = require('./search');
	var select = require('./select');
	var shop = require('./shop');
	var shopimg = require('./shopimg');
	var signin = require('./signin');
	var signout = require('./signout');
	var signup = require('./signup');

	//shop img route
	const shop_img = multer({
		storage: multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, 'public/img/mall');
			},
			filename: function (req, file, cb) {
				cb(null, file.originalname);
			}
		}),
	});

	router.get('/', (req, res) => { home.show(req, res, db) });

	router.get("/signin", (req, res) => { signin.show(req, res, db) });
	router.post("/signin/confirm", (req, res) => { signin.confirm(req, res, db, crypto) });

	router.get("/signup", (req, res) => { signup.show(req, res, db) });
	router.get("/signup/checkaccount", (req, res) => { signup.checkaccount(req, res, db) });
	router.post("/signup/confirm", (req, res) => { signup.confirm(req, res, db, crypto, nodemailer) });
	router.post("/signup/overlap", (req, res) => { signup.overlap(req, res, db) });
	router.post("/signup/effectiveness", (req, res) => { signup.effectiveness(req, res, db) });

	router.get("/signout", (req, res) => { signout.do(req, res, db) });

	router.get("/account/setting", (req, res) => { account.setting(req, res, db) });
	router.post("/account/password", (req, res) => { account.password(req, res, db, crypto) });
	router.post("/account/certification", (req, res) => { account.certification(req, res, db, nodemailer) });

	router.get("/findpw", (req, res) => { findpw.show(req, res, db) });

	router.post("/reset/password", (req, res) => { reset.password(req, res, db, crypto, nodemailer) });

	router.get("/management", (req, res) => { management.show(req, res, db) });

	router.get("/item/info", (req, res) => { item.info(req, res, db) });
	router.post("/item/cart", (req, res) => { item.cart(req, res, db) });
	router.post("/item/contact", (req, res) => { item.contact(req, res, db, nodemailer) });
	router.post("/item/add/category", (req, res) => { item.add_category(req, res, db) });

	router.get("/review", (req, res) => { review.show(req, res, db) });
	router.get("/review/delete", (req, res) => { review.delete(req, res, db) });
	router.post("/review/confirm", (req, res) => { review.confirm(req, res, db) });

	router.post("/select/model", (req, res) => { select.model(req, res, db) });
	router.post("/select/version", (req, res) => { select.version(req, res, db) });

	router.get("/download", (req, res) => { download.do(req, res, db) });

	router.get("/brand", (req, res) => { brand.show(req, res, db) });

	router.get("/search", (req, res) => { search.do(req, res, db) });

	router.post("/order", (req, res) => { order.show(req, res, db) });

	router.post("/payments/complete", (req, res) => { payments.complete(req, res, db) });

	router.get("/receipt", (req, res) => { receipt.show(req, res, db) });

	router.get("/cart", (req, res) => { cart.show(req, res, db) });
	router.post("/cart/delete", (req, res) => { cart.delete(req, res, db) });

	router.get("/shop", (req, res) => { shop.show(req, res, db) });
	router.get("/shop/item", (req, res) => { shop.item(req, res, db) });

	router.post('/mainimg/change', shop_img.single("img"), (req, res) => { mainimg.change(req, res, db) });

	router.post('/shopimg/change', shop_img.array("img"), (req, res) => { shopimg.change(req, res, db) });

	return router;
}
