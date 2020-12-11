const { Article } = require('../models/model');
const { Comment } = require('../models/model')
var express = require('express');
var router = express.Router();

// article 생성하기
router.post('/create', function (req, res, next) {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author._id
  });
  article.save((err) => {
    if (err) console.log(err);
    else res.status(200).json(article);
  });
});

// article 받아오기
router.get('/:id', function (req, res, next) {
  Article.findOne({ _id: req.params.id }).populate('author').exec((err, article) => {
    if (err) console.log(err);
    else {
      console.log(article);
      res.status(200).json(article);
    }
  })
})

// Comments 받아오기
router.get('/comment/:id', function (req, res, next) {
  Comment.find({ article: req.params.id }).populate('article').populate('author').exec((err, comment) => {
    if (err) console.log(err);
    else {
      {
        console.log(comment)
        res.status(200).json(comment);
      }
    }
  })
})

// Comment 달기
router.post('/comment', function (req, res, next) {
  const comment = new Comment({
    content: req.body.comment.content,
    article: req.body.article._id,
    author: req.body.author._id,
    //rating : req.body.comment.rating
  })
  comment.save((err) => {
    if (err) {
      console.log(err);
    }
    else res.status(200).json(comment);
  })
})

module.exports = router;
