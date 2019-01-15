const express = require('express');
const nunjucks = require('nunjucks');
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'nunjucks');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', function (req, res) {
  return res.render('views/index.html');
//  res.send(JSON.stringify({ Hello: 'stupid ass world'}));
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

app.listen(port, function () {
 console.log(`Example app listening on port !`);
});