var express = require('express');
var router = express.Router();
const multer = require('multer');

const upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('register', { title: 'Who?' });
});

router.get('/user', function(req, res, next) {
  res.render('blog', { name: users[0].username });
});

let users = [];

router.post('/user', upload.none(), (req, res) => {

  if (req.body.username) {

    const user = {

      username: req.body.username,

    }
    users.push(user);

    res.redirect('/user');


  } else {

    res.render("error");

  }

});

module.exports = router;
