'use strict';
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();


app.set('view engine', 'nunjucks');

app.use('/', function(req, res, next) {
      res.render('views/acquisio-demo/index.html', {
        metaDescription: '',
        title: 'Acquisio Demo test'
      });
  });

app.listen(port, function () {
 console.log('Example app listening on port !');
});