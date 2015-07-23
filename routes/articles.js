var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var articleCollection = db.get('articles');

//***********
//** INDEX **
//***********

router.get('/articles', function (req, res, next) {
  articleCollection.find({}, function (err, docs) {
    res.render('articles/index', {articles: docs});
  });
});

//***********
//** NEW   **
//***********

router.get('/articles/new', function (req, res, next) {
  res.render('articles/new');
});

//***********
//**CREATE **
//***********

router.post('/articles', function (req, res, next) {
  articleCollection.insert({title: req.body.title, background_url: req.body.background, background_dark: req.body.background_dark, excerpt: req.body.excerpt, body: req.body.body});
  res.redirect('/articles');
});

//***********
//** SHOW  **
//***********

router.get('/articles/:id', function (req, res, next) {
  articleCollection.findOne({_id: req.params.id}, function (err, doc) {
    res.render('articles/show', {article: doc});
  });
});

//***********
//** EDIT  **
//***********

router.get('/articles/:id/edit', function (req, res, next) {
  articleCollection.findOne({_id: req.params.id}, function (err, doc) {
    res.render('articles/edit', {article: doc});
  });
});

//***********
//**UPDATE **
//***********

router.post('/articles/:id', function (req, res, next) {
  articleCollection.update({_id: req.params.id}, {})
  res.redirect('/articles/'+req.params.id);
});

//***********
//**DELETE **
//***********

router.post('/articles/:id/delete', function (req, res, next) {
  articleCollection.remove({_id: req.params.id});
  res.redirect('/articles');
});

module.exports = router;
