var express = require('express');
var crypto = require('crypto');
var router = express.Router();
const { UserDetails } = require('../models/model');
const { use } = require('./article');

// 회원가입
router.post('/signup', function (req, res, next) {
  const passwd = req.body.passwd;
  const salt = Math.round((new Date().valueOf() + Math.random())) + "";
  const hashPw = crypto.createHash("sha512").update(passwd + salt).digest("hex");

  const user = new UserDetails({
    name: req.body.name,
    n_name: req.body.n_name,
    passwd: hashPw,
    salt: salt,
    birth_y: req.body.birth_y,
    birth_m: req.body.birth_m,
    major: req.body.major,
    dream: req.body.dream,
    region: req.body.region,
  })
  user.save((err) => {
    if (err) {
      console.log(err);
      res.json({ success: false });
    }
    else res.status(200).json({ success: true })
  })
});
/*
router.get('/login', function(req, res, next) {
  res.json({
    session: req.session
  })
})
*/

// 로그인
router.post('/login', function (req, res, next) {
  UserDetails.findOne({
    n_name: req.body.n_name
  }, (err, user) => {
    if (err) console.log(err);
    else if (user == null) res.status(200).json({ fail: true });
    else {
      hashPw = crypto.createHash("sha512").update(req.body.passwd + user.salt).digest("hex");
      if (user.passwd === hashPw) {
        console.log("비밀번호 일치");
        req.session.n_name = req.body.n_name;
        req.session.major = user.major;
        req.session.dream = user.dream;
      }
      else {
        console.log("비밀번호 불일치");
      }
      res.status(200).json({
        session: req.session
      });
    }
  });
})

// 로그아웃
router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.clearCookie('sid');

  res.status(200).json({
    success: true
  })
})

// 닉네임으로 유저 정보 가져오기
router.get('/getUser/:n_name', function (req, res, next) {
  UserDetails.findOne({ n_name: req.params.n_name }, (err, user) => {
    if (err) console.log(err);
    else {
      console.log(user);
      res.status(200).send(user);
    }
  })
})

// 닉네임으로 유저 정보 업데이트
router.put('/updateUser', function (req, res, next) {
  const passwd = req.body.passwd;
  const salt = Math.round((new Date().valueOf() + Math.random())) + "";
  const hashPw = crypto.createHash("sha512").update(passwd + salt).digest("hex");

  UserDetails.findOneAndUpdate({ n_name: req.body.n_name }, { 
    n_name: req.body.n_name,
    passwd: hashPw,
    salt: salt,
    major: req.body.major,
    dream: req.body.dream,
    region: req.body.region,
   }, { new: true }, (err, user) => {
    if (err) console.log(err);
    else res.status(200).json({success:true});
  })
})

// 유저에 article 할당시키기
router.put('/article/:_id', function (req, res, next) {
  UserDetails.findOne({ _id: req.params._id }, (err, user) => {
    if (err) console.log(err);
    else {
      user.articles.push(req.body._id);
      user.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ success: false });
        }
        else {
          res.status(200).json({ success: true });
        }
      })
    }
  })
})

// article 좋아요 누르기
router.put('/like/:id', function( req, res, next) {
  UserDetails.findOne({_id: req.params.id}, (err, user) => {
    if(err) console.log(err);
    else {
      user.likes.push(req.body.article_id);
      user.save((err)=> {
        if(err) {
          console.log(err);
          res.status(500).json({ success: false });
        }
        else res.status(200).json({ success: true });
      })
    }
  })
})

// article 좋아요 해제하기
router.put('/unlike/:id', function( req, res, next) {
  UserDetails.findOne({_id: req.params.id}, async (err, user) => {
    if(err) console.log(err);
    else {
      await user.update({$pull: {likes: req.body.article_id}});
      user.save((err)=> {
        if(err) {
          console.log(err);
          res.status(500).json({ success: false });
        }
        else res.status(200).json({ success: true });
      })
    }
  })
})

module.exports = router;
