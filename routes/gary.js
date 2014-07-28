var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/feed', function(req, res) {
    var db = req.db;
    db.collection('gary').find().toArray(function (err, items) {
        res.json(items);
    });
});

router.get('/', function(req, res) {
  res.render('gary', { title: 'gary' });
});

router.post('/rate', function(req, res) {
	var db = req.db;
	var updateInfo = {};
	updateInfo.question = String;
	var updateInfo = req.body;	
	var gary = db.collection('gary');	
	var queryInfo = { questionnumber: updateInfo.question };

	gary.update( 
		queryInfo
		//	, {priority:-1}
		, {$set: {rating: updateInfo.rating, ratings: updateInfo.ratings}}
		, { upsert:false}
		, function(err, result) {
			 res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
        		 });
			});


router.post('/counter', function(req, res) {
	var db = req.db;
	var gary = db.collection('gary');	
	gary.update( 
		{ seq: 0 }
		, {$inc:  { counter: 1}}
		, { upsert:false}
		, function(err, result) {
			res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
			});

     });

module.exports = router;
