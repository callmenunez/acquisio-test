'use strict';
const express = require('express');
const nunjucks = require('nunjucks');

const port = process.env.PORT || 3000;
const app = express();


app.set('view engine', 'nunjucks');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function(req, res, next) {
      res.render('views/acquisio-demo/index.html', {
        metaDescription: '',
        title: 'Acquisio Demo test'
      });
  });

// Nunjucks Configurations
const env = nunjucks.configure(__dirname, {
  autoescape: false,
  express: app
});

env.addFilter('htmlConvert', (str) => {
  const lines = str.split('\n');
  let res = '';

  for (var i = 0; i < lines.length; i++) {
    if (lines[i]) {
      res += '<p>' + lines[i] + '</p>';
    }
  }
  return res;
});

env.addFilter('jsonStringify', (str) => {
  return JSON.stringify(str);
});

app.listen(port, function () {
 console.log('Example app listening on port !');
});