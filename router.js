const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Blogs} = require('./models');

//below functions will cause something to be there when the server is started
Blogs.create('Romeo and Juliet', 'A love story about teens in Italy', 'William Shakespeare', '1500s');
Blogs.create('10,000 Hours', 'Studying the World\'s Greatest Performers', 'Malcolm Gladwell', '2007');

//CRUD functions
//GET
router.get('/', (req, res) => {
  res.json(Blogs.get());
});

//POST (title, content, author, publishDate)
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = Blogs.create(req.body.name, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
});

//DELETE
router.delete('/:id', (req, res) => {
  Blogs.delete(req.params.id);
  console.log(`Deleted blog item \`${req.params.ID}\``);
  res.status(204).end();
});

//PUT
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog item \`${req.params.id}\``);
  const updatedItem = Blogs.update({
    id: req.params.id,
    title: req.params.title,
    content: req.params.content,
    author: req.params.author,
    publishDate: req.params.publishDate
  });
  res.status(204).json(updatedItem);
});

module.exports = router;