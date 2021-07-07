module.exports = function(db) {

	var express = require('express');
	var router = express.Router();

	var fs = require('fs');
	var multer = require('multer');
	var crypto = require('crypto');

	var admin_etc = require('./admin_etc');
	var admin_item = require('./admin_item');
	var admin_user = require('./admin_user');
	var admin_ranking = require('./admin_ranking');
	var admin_category = require('./admin_category');
	var admin_carbrand = require('./admin_carbrand');
	var admin_itembrand = require('./admin_itembrand');


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

	router.get("/add", (req, res) => { admin_etc.add(req, res, db) });
	router.get('/mainimg', (req, res) => { admin_etc.mainimg(req, res, db) });
	router.get('/shopimg', (req, res) => { admin_etc.shopimg(req, res, db) });
	router.post('/file/delete', (req, res) => { admin_etc.file_delete(req, res, db, fs) });
	router.post('/img/delete', (req, res) => { admin_etc.img_delete(req, res, db, fs) });

	router.get("/item", (req, res) => { admin_item.show(req, res, db) });
	router.post("/item/add", upload.fields([{ name: 'item_img', maxCount: 5 }, { name: "file", maxCount: 5 }]), (req, res) => { admin_item.add(req, res, db, crypto) });
	router.post("/item/delete", (req, res) => { admin_item.delete(req, res, db, fs) });
	router.post("/item/search", (req, res) => { admin_item.search(req, res, db) });
	router.post("/item/setting", upload.fields([{name:"img", maxCount:5},{name:"file",maxCount:5}]), (req, res) => { admin_item.setting(req, res, db) });

	router.get("/user", (req, res) => { admin_user.show(req, res, db) });
	router.post("/user/delete", (req, res) => { admin_user.delete(req, res, db) });
	router.post("/user/change", (req, res) => { admin_user.change(req, res, db) });

	router.get("/ranking", (req, res) => { admin_ranking.show(req, res, db) });
	router.post("/ranking/add", (req, res) => { admin_ranking.add(req, res, db) });
	router.post("/ranking/delete", (req, res) => { admin_ranking.delete(req, res, db) });
	router.post("/ranking/setting", (req, res) => { admin_ranking.setting(req, res, db) });

	router.get("/category", (req, res) => {admin_category.show(req, res, db) });
	router.post("/category/add", (req, res) => { admin_category.add(req, res, db) });
	router.post("/category/delete/main", (req, res) => { admin_category.delete_main(req, res, db) });
	router.post("/category/delete/sub", (req, res) => { admin_category.delete_sub(req, res, db) });

	router.get("/carbrand", (req, res) => { admin_carbrand.show(req, res, db) });
	router.post("/carbrand/add", upload_car_brand.single("brandimg"), (req, res) => { admin_carbrand.add(req, res, db) });
	router.post("/carbrand/delete", (req, res) => { admin_carbrand.delete(req, res, db, fs) });
	router.post("/carbrand/change", upload_car_brand.single("img"), (req, res) => {admin_carbrand.change(req, res, db)});

	router.get("/itembrand", (req, res) => { admin_itembrand.show(req, res, db) });
	router.post("/itembrand/add", upload_car_brand.single("brandimg"), (req, res) => { admin_itembrand.add(req, res, db) });
	router.post("/itembrand/delete", (req, res) => { admin_itembrand.delete(req, res, db, fs) });
	router.post("/itembrand/change", upload_item_brand.single("img"), (req, res) => {admin_itembrand.change(req, res, db)});

	return router;
}
