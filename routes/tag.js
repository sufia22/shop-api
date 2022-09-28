const express = require('express');
const { getAllTags, createTag, singleTag, deleteTag, updateTag } = require('../controllers/tagController');


// init router 
const router = express.Router();


// routes
router.route('/').get(getAllTags).post(createTag);
router.route('/:slug').get(singleTag).delete(deleteTag).put(updateTag).patch(updateTag);




// export tag route
module.exports = router;