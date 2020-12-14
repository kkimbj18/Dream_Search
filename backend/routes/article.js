const { Article, UserDetails } = require('../models/model');
const { Comment } = require('../models/model')
var express = require('express');
var router = express.Router();

// article 생성하기
router.post('/create', function (req, res, next) {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author._id,
    major: req.body.author.major,
    dream: req.body.author.dream
  });
  article.save((err) => {
    if (err) console.log(err);
    else res.status(200).json(article);
  });
});

// id로 article 받아오기
router.get('/:id', function (req, res, next) {
  Article.findOne({ _id: req.params.id }).populate('author').populate('rating').exec((err, article) => {
    if (err) console.log(err);
    else {
      res.status(200).json(article);
    }
  })
})

// 동일한 major article 받아오기
router.get('/major/:major', function (req, res, next) {
  Article.find({ major: req.params.major }).populate('author').exec((err, articles) => {
    if (err) console.log(err);
    else {
      res.status(200).json(articles);
    }
  })
})

// 동일한 dream article 받아오기
router.get('/dream/:dream', function (req, res, next) {
  Article.find({ dream: req.params.dream }).populate('author').exec((err, articles) => {
    if (err) console.log(err);
    else {
      res.status(200).json(articles);
    }
  })
})

// article 삭제하기
router.delete('/delete/:id', function (req, res, next) {
  Article.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) console.log(err);
    else {
      UserDetails.findOne({ _id: result.author }, async (err, user) => {
        if (err) console.log(err);
        else {
          await UserDetails.updateOne({ _id: result.author }, { $pull: { articles: result._id } });
          user.save();
        }
      });
      res.status(200).json({ success: true });
    }
  })
})

// article 수정하기
router.put('/update/:id', function (req, res, next) {
  Article.findOneAndUpdate({ _id: req.params.id }, {
    title: req.body.title,
    content: req.body.content
  }, { new: true }, (err, result) => {
    if (err) console.log(err);
    else {
      res.status(200).json({ success: true });
    }
  })
})

// Comments 받아오기
router.get('/comment/:id', function (req, res, next) {
  Comment.find({ article: req.params.id }).populate('article').populate('author').exec((err, comment) => {
    if (err) console.log(err);
    else {
      {
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
    rating: req.body.comment.rating
  })
  comment.save((err) => {
    if (err) {
      console.log(err);
    }
    else {
      Comment.aggregate([
        { $match: { 'article': req.body.article._id } },
        {
          $group:
          {
            '_id': null,
            'rating': { '$avg': '$rating' }
          }
        }
      ], async (err, result) => {
        if (err) console.log(err);
        else {
          console.log(result[0].rating);
          await Article.findOneAndUpdate({ _id: req.body.article._id }, { rating: result[0].rating }, { new: true })
        }
      })
      res.status(200).json(comment);
    }
  })


})

module.exports = router;
