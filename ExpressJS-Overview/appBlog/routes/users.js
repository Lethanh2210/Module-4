var express = require('express');
var router = express.Router();
const multer = require('multer');

const upload = multer();

/* GET users listing. */


let blogs = [];
let i = 0;

router.post('/blog', upload.none(),function(req, res, next) {

  if (req.body.blog) {
    i = i+1;

    let blog = {
      blog : req.body.blog
    }

    blogs.unshift(blog);

    res.render("show", {blogs: blogs});

  } else {

    res.render("error");

  }
});

module.exports = router;
