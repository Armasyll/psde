const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/fire', function(req, res, next) {
	res.render('fire');
});

module.exports = router;
