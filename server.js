// Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const stylus = require('stylus');
const nib = require('nib');

// Routes
const routes = require('./routes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

function compile(str, path) {
  return stylus(str)
      .set('filename', path)
      .use(nib())
}

app.use(stylus.middleware({
    src: __dirname + '/public/css',
    compile: compile
}))


app.listen(5000, () => {
  console.log("Listening port at " + new Date());
});
