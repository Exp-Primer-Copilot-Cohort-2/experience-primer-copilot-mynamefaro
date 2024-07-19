// Create web server
// Start server
// Load express module
const express = require('express');
// Create express instance
const app = express();
// Load body-parser module
const bodyParser = require('body-parser');
// Load mongoose module
const mongoose = require('mongoose');
// Load Comment model
const Comment = require('./models/comment');
// Load cors module
const cors = require('cors');
// Load dotenv module
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
// Use body-parser
app.use(bodyParser.json());
// Use cors
app.use(cors());

// Get all comments
app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(comments);
    }
  });
});

// Create a comment
app.post('/comments', (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
  });

  comment.save((err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(comment);
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started');
});