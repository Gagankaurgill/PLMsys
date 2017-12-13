var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://gagangill:123456@ds155582.mlab.com:55582/librarydb';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/insert', function(req, res, next) {
  var item = {
    email: req.body.inputEmail,
    password: req.body.inputPassword
    
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/login');
});

router.post('/userdata', function(req, res, next) {
  var email=req.body.inputEmail;
  var password=req.body.inputPassword;
  if (email=="admin@plm.com" && password=="admin"){
    res.redirect('/home');
  }else{
    res.redirect('/login');
  }

  
});

router.post('/insertLibrary', function(req, res, next) {
  var item = {
    Library_Name: req.body.inputLibName,
    Library_Address: req.body.inputAddress
    
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('Library').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/addLibrary');
});

router.post('/insertBook', function(req, res, next) {
  var item = {
    Book_Name: req.body.inputBookName,
    Book_Author: req.body.inputBookAuthor
    
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('Books').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/addBooks');
});

router.get('/listBooks', function(req, res, next) {
  
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('Books').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('getBooks', {items: resultArray});
    });
  });
});

router.get('/register', function(req, res, next) {
  res.render('register');
});
router.get('/addLibrary', function(req, res, next) {
  res.render('addLibrary');
});

router.get('/addBooks', function(req, res, next) {
  res.render('addBooks');
});
router.get('/getBooks', function(req, res, next) {
  res.render('getBooks');
});
router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
