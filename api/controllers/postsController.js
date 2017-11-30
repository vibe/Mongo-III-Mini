const mongoose = require('mongoose');
const Post = require('../models/post');
const Comment = require('../models/comment');

const STATUS_USER_ERROR = 422;

/* Fill in each of the below controller methods */
const createPost = (req, res) => {
  const { title, text } = req.body;
  const newPost = new Post({ title, text });
  newPost.save((error, createdPost) => {
    return error ? res.status(STATUS_USER_ERROR).json({ error: error.message }) : res.json(createdPost);
  });
};

const listPosts = (req, res) => {
  Post.find({}).populate('comments', 'text').exec((error, posts) => {
    return error ? res.status(500).json({ error: error.message }) : res.json(posts);
  });
};

const findPost = (req, res) => {
  const { id } = req.params;
  
};

const addComment = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const newComment = new Comment({ _parent: id, text });
  newComment.save((error, comment) => {
    if (error) {
      return res.status(STATUS_USER_ERROR).json({ error: error.message });
    }
    Post.findById(id, (error, post) => {
      if (error) {
        res.status(STATUS_USER_ERROR).json({ error: error.message });
        return;
      }
      post.comments.push(comment);
      post.save((err, p) => {
        return error ? res.status(STATUS_USER_ERROR).json({ error: err.message }) : res.json({ success: true });
      });
    });
  });
};

// In this function, we need to delete the comment document
// We also need to delete the comment's parent post's reference
// to the comment we just deleted
const deleteComment = (req, res) => {

};

// Similarly, in this function we need to delete the post document,
// along with any comments that are the children of this post
// We don't want any orphaned children in our database
const deletePost = (req, res) => {

};

module.exports = {
  createPost,
  listPosts,
  findPost,
  addComment,
  deleteComment,
  deletePost
};

