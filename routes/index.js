module.exports = function(db) {

	var express = require('express');
	var router = express.Router();

	var fs = require('fs');
	var multer = require('multer');
	var crypto = require('crypto');
	var nodemailer = require('nodemailer');

	var account = require('./account');
	var admin = require('./admin');
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


	//item img route
	const upload = multer({
		storage: multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, 'public/stylesheet/img/item');
			},
			filename: function (req, file, cb) {
				cb(null, file.originalname);
			}
		}),
	});
	//item brands img route
	const upload_item_brand = multer({
		storage: multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, 'public/stylesheet/img/item_brands');
			},
			filename: function (req, file, cb) {
				cb(null, file.originalname);
			}
		}),
	});

	//car brands img route
	const upload_car_brand = multer({
		storage: multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, 'public/stylesheet/img/car_brands');
			},
			filename: function (req, file, cb) {
				cb(null, file.originalname);
			}
		}),
	});

	//shop img route
	const shop_img = multer({
		storage: multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, 'public/stylesheet/img/mall');
			},
			filename: function (req, file, cb) {
				cb(null, file.originalname);
			}
		}),
	});


	router.get('/', (req, res) => { home.show(req, res, db) });

	router.get("/signin", (req, res) => { signin.show(req, res, db) });
	router.post("/signin/confirm", (req, res) => { console.log('abc'); signin.confirm(req, res, db, crypto) });

	router.get("/signup", (req, res) => { signup.show(req, res, db) });
	router.get("/signup/checkaccount", (req, res) => { signup.checkaccount(req, res, db) });
	router.post("/signup/confirm", (req, res) => { signup.confirm(req, res, db, crypto, nodemailer) });
	router.post("/signup/overlap", (req, res) => { signup.overlap(req, res, db) });
	router.post("/signup/effectiveness", (req, res) => { signup.effectiveness(req, res, db) });

	router.get("/account/setting", (req, res) => { account.setting(req, res, db) });
	router.post("/account/password", (req, res) => { account.password(req, res, db, crypto) });
	router.post("/account/certification", (req, res) => { account.certification(req, res, db, nodemailer) });

	router.get("/signout", (req, res) => { signout.do(req, res, db) });

	router.get("/findpw", (req, res) => { findpw.show(req, res, db) });

	router.get("/management", (req, res) => { management.show(req, res, db) });

	router.get("/admin/add", (req, res) => { admin.add(req, res, db) });
	router.get('/admin/mainimg', (req, res) => { admin.mainimg(req, res, db) });
	router.get('/admin/shopimg', (req, res) => { admin.shopimg(req, res, db) });
	router.post('/admin/file/delete', (req, res) => { admin.file_delete(req, res, db, fs) });
	router.post('/admin/img/delete', (req, res) => { admin.img_delete(req, res, db, fs) });

	router.get("/admin/item", (req, res) => { admin.item_show(req, res, db) });
	router.post("/admin/item/add", upload.fields([{ name: 'item_img', maxCount: 5 }, { name: "file", maxCount: 5 }]), (req, res) => { admin.item_add(req, res, db, crypto) });
	router.post("/admin/item/delete", (req, res) => { admin.item_delete(req, res, db, fs) });
	router.post("/admin/item/search", (req, res) => { admin.item_search(req, res, db) });
	router.post("/admin/item/setting", upload.fields([{name:"img", maxCount:5},{name:"file",maxCount:5}]), (req, res) => { admin.item_setting(req, res, db) });

	router.get("/admin/user", (req, res) => { admin.user_show(req, res, db) });
	router.post("/admin/user/delete", (req, res) => { admin.user_delete(req, res, db) });
	router.post("/admin/user/change", (req, res) => { admin.user_change(req, res, db) });

	router.get("/admin/ranking", (req, res) => { admin.ranking_show(req, res, db) });
	router.post("/admin/ranking/add", (req, res) => { admin.ranking_add(req, res, db) });
	router.post("/admin/ranking/delete", (req, res) => { admin.ranking_delete(req, res, db) });
	router.post("/admin/ranking/setting", (req, res) => { admin.ranking_setting(req, res, db) });

	router.get("/admin/category", (req, res) => {admin.carbrand_show(req, res, db) });
	router.post("/admin/category/add", (req, res) => { admin.category_add(req, res, db) });
	router.post("/admin/category/delete/sub", (req, res) => { admin.category_delete_sub(req, res, db) });
	router.post("/admin/category/delete/main", (req, res) => { admin.category_delete_main(req, res, db) });

	router.get("/admin/car_brand", (req, res) => { admin.carbrand_show(req, res, db) });
	router.post("/admin/car_brand/add", upload_car_brand.single("brandimg"), (req, res) => { admin.carbrand_add(req, res, db) });
	router.post("/admin/car_brand/delete", (req, res) => { admin.carbrand_delete(req, res, db, fs) });
	router.post("/admin/car_brand/change", upload_car_brand.single("img"), (req, res) => {admin.carbrand_change(req, res, db)});

	router.get("/admin/itembrand", (req, res) => { admin.itembrand_show(req, res, db) });
	router.post("/admin/itembrand/add", upload_car_brand.single("brandimg"), (req, res) => { admin.itembrand_add(req, res, db) });
	router.post("/admin/itembrand/delete", (req, res) => { admin.itembrand_delete(req, res, db, fs) });
	router.post("/admin/itembrand/change", upload_item_brand.single("img"), (req, res) => {admin.itembrand_change(req, res, db)});

	router.get("/item/info", (req, res) => { item.info(req, res, db) });
	router.post("/item/cart", (req, res) => { item.cart(req, res, db) });
	router.post("/item/contact", (req, res) => { item.contact(req, res, db, nodemailer) });
	router.post("/item/add/category", (req, res) => { item.add_category(req, res, db) });

	router.get("/download", (req, res) => { download.do(req, res, db) });

	router.post("/reset/password", (req, res) => { reset.password(req, res, db, crypto, nodemailer) });

	router.get("/review", (req, res) => { review.show(req, res, db) });
	router.get("/review/delete", (req, res) => { review.delete(req, res, db) });
	router.post("/review/confirm", (req, res) => { review.confirm(req, res, db) });

	router.post("/select/model", (req, res) => { select.model(req, res, db) });
	router.post("/select/version", (req, res) => { select.version(req, res, db) });

	router.get("/brand", (req, res) => { brand.show(req, res, db) });

	router.get("/search", (req, res) => { search.do(req, res, db) });

	router.post("/order", (req, res) => { order.show(req, res, db) });

	router.post("/payments/complete", (req, res) => { payments.complete(req, res, db) });

	router.get("/receipt", (req, res) => { receipt.show(req, res, db) });

	router.get("/cart", (req, res) => { cart.show(req, res, db) });
	router.post("/cart/delete", (req, res) => { cart.delete(req, res, db) });

	router.get("/shop", (req, res) => { shop.show(req, res, db) });
	router.get("/shop/item", (req, res) => { shop.item(req, res, db) });

	router.post('/mainimg/change',shop_img.single("img"), (req, res) => { mainimg.change(req, res, db) });

	router.post('/shopimg/change',shop_img.array("img"), (req, res) => { shopimg.change(req, res, db) });

	return router;
}
