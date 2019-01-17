'use strict'
const express = require('express');
const nunjucks = require('nunjucks');
const port = process.env.PORT || 3000;

const awsSave = require('./middleware/aws-save').middlewareStack;
const awsRetrieve = require('./middleware/aws-retrieve').middlewareStack;

const app = express();

app.set('view engine', 'nunjucks');

//sets the static route for images, css files, or anything else in the public folder
app.use('/public', express.static('public'));

app.use('/success', awsSave, function(req, res, next) {
  const brandDomain = req.headers.host;
  if (brandDomain.indexOf('leadstreamdemo') >= 0) {
    res.render('views/success/index.html', {
      className: 'success',
      metaDescription: '',
      title: 'Lead Stream Demo',
      customCode: res.customCode,
      customerName: res.customerName,
      brandDomain: brandDomain
    });
  }
});

app.use('/:customCode', awsRetrieve, function(req, res, next) {
  // function logResponseBody(req, res, next) {
  //   var oldWrite = res.write,
  //       oldEnd = res.end;
  //   var chunks = [];
  //   res.write = function (chunk) {
  //     chunks.push(chunk);
  //     oldWrite.apply(res, arguments);
  //   };
  //   res.end = function (chunk) {
  //     if (chunk)
  //       chunks.push(chunk);
  //     var body = Buffer.concat(chunks).toString('utf8');
  //     console.log(req.path, body);
  //     oldEnd.apply(res, arguments);
  //   };
  //   next();
  // }
  
  // app.use(logResponseBody);

    res.render('views/index.html', {
      metaDescription: '',
      title: 'customeCode Acquisio Test',
      repName: res.repName,
      repTitle: res.repTitle,
      repPhone: res.repPhone,
      repEmail: res.repEmail,
      repImage: res.repImage,
      repId: res.repId,
      customerName: res.customerName,
      customerSegment: res.customerSegment,
      screenShareType: res.screenShareType,
      screenShareCode: res.screenShareCode,
      property: res.property,
      customCode: res.customCode,
      referer: req.headers.referer
    });
});

app.use('/', function (req, res) {
  return res.render('views/index.html', {
    title: 'Acquisio Test'
  });
});

// Nunjucks Configurations
const env = nunjucks.configure(__dirname, {
  autoescape: false,
  express: app
});

app.listen(port, function () {
 console.log(`Example app listening on port !`);
});