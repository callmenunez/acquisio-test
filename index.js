const express = require('express');
const nunjucks = require('nunjucks');
const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'nunjucks');
app.use('/public', express.static('public'));

app.use('/', function (req, res) {
  return res.render('views/index.html');
});

// Nunjucks Configurations
const env = nunjucks.configure(__dirname, {
  autoescape: false,
  express: app
});

app.listen(port, function () {
 console.log(`Example app listening on port !`);
});