const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = router;
