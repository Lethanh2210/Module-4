var express = require('express');
var router = express.Router();
const multer = require('multer');

const upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

const arrayUser = [];



router.post('/user/register', upload.none(), (req, res) => {

  if (req.body.username && req.body.password) {

    const user = {

      username: req.body.username,

      password: req.body.password

    }

    arrayUser.push(user);

    console.log(arrayUser);

    res.render("success", { user: user });

  } else {

    res.render("error");

  }

});

module.exports = router;
