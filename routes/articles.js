var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var articleCollection = db.get('articles');

//***********
//** INDEX **
//***********

router.get('/articles', function (req, res, next) {
  res.render('articles/index');
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
  res.redirect('/articles');
});

//***********
//** SHOW  **
//***********

router.get('/articles/:id', function (req, res, next) {
  res.render('articles/show');
});

//***********
//** EDIT  **
//***********

router.get('/articles/:id/edit', function (req, res, next) {
  res.render('articles/edit');
});

//***********
//**UPDATE **
//***********

router.post('/articles/:id', function (req, res, next) {
  res.redirect('/articles/:id');
});

//***********
//**DELETE **
//***********

router.post('/articles/:id/delete', function (req, res, next) {
  res.redirect('/articles');
});

module.exports = router;
