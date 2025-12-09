const express = require('express');
const router = express.Router();

const {
  getBookmarks,
  deleteBookmark,
} = require('../controllers/bookmarks');

router.route('/')
  .get(getBookmarks);

router.route('/:id')
  .delete(deleteBookmark)

module.exports = router;
