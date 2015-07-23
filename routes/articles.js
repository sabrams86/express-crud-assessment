var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var articleCollection = db.get('articles');
var Error = require('./../lib/validator');

//***********
//** INDEX **
//***********

router.get('/articles', function (req, res, next) {
  articleCollection.find({}, {sort: {dateCreated: -1}}).then(function (docs) {
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
  var validate = new Error();
  var date = new Date();
  date = date.toString();
  validate.exists(req.body.title, "Title cannot be blank");
  validate.exists(req.body.excerpt, "Excerpt cannot be blank");
  validate.exists(req.body.body, "Body cannot be blank");
  if (validate._errors.length > 0){
    res.render('articles/new', {errors: validate._errors, title: req.body.title, background_url: req.body.background, background_dark: req.body.background_dark, excerpt: req.body.excerpt, body: req.body.body})
  } else {
    articleCollection.insert({title: req.body.title, dateCreated: date, background_url: req.body.background, background_dark: req.body.background_dark, excerpt: req.body.excerpt, body: req.body.body});
    res.redirect('/articles');
  }
});

//***********
//** SHOW  **
//***********

router.get('/articles/:id', function (req, res, next) {
  articleCollection.findOne({_id: req.params.id}).then(function (doc) {
    res.render('articles/show', {article: doc});
  });
});

//***********
//** EDIT  **
//***********

router.get('/articles/:id/edit', function (req, res, next) {
  articleCollection.findOne({_id: req.params.id}).then(function (doc) {
    res.render('articles/edit', {article: doc});
  });
});

//***********
//**UPDATE **
//***********

router.post('/articles/:id', function (req, res, next) {
  var validate = new Error();
  var article = {
    dateCreated: req.body.dateCreated,
    _id: req.params.id,
    title: req.body.title,
    background_url:
    req.body.background,
    background_dark:
    req.body.background_dark,
    excerpt: req.body.excerpt,
    body: req.body.body
  }
  validate.exists(req.body.title, "Title cannot be blank");
  validate.exists(req.body.excerpt, "Excerpt cannot be blank");
  validate.exists(req.body.body, "Body cannot be blank");
  if (validate._errors.length > 0){
    res.render('articles/edit', {errors: validate._errors, article: article})
  } else {
    articleCollection.update({_id: req.params.id}, {dateCreated: req.body.dateCreated, title: req.body.title, background_url: req.body.background, background_dark: req.body.background_dark, excerpt: req.body.excerpt, body: req.body.body})
    res.redirect('/articles/'+req.params.id);
  }
});

//***********
//**DELETE **
//***********

router.post('/articles/:id/delete', function (req, res, next) {
  articleCollection.remove({_id: req.params.id});
  res.redirect('/articles');
});

module.exports = router;
