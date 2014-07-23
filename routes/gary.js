var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/feed', function(req, res) {
    var db = req.db;
    db.collection('gary').find().toArray(function (err, items) {
        res.json(items);
    });
});

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('gary', { title: 'gary' });
});



module.exports = router;
