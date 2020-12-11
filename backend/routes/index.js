const {Article} = require('../models/model');
var express = require('express');
var router = express.Router();

// 전체 article 받아오기
router.get('/', function(req, res, next) {
  Article.find({}).populate('author').sort({"date": -1}).exec((err, article) => {
    if(err) console.log(err);
    else {
      res.status(200).json(article);
    }
  })
});

module.exports = router;
