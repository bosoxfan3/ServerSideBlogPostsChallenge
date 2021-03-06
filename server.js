const express = require('express');
const morgan = require('morgan');

const app = express();
const router = require('./router');

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/blog-posts', router);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});