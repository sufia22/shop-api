const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllCategories, createCategory, singleCategory, deleteCategory, updateCategory } = require('../controllers/categoryController');


// init router
const router = express();

// multer setup
const categoryStorage = multer.diskStorage({
    destination : ( req, file, cb ) => {

        cb(null, path.join(__dirname, '../public/images/category'));
    },
    filename : ( req, file, cb ) => {

        cb(null, file.originalname);
    }
});

const categoryMulter = multer({
    storage : categoryStorage
}).single('photo')


// category routes
router.route('/').get(getAllCategories).post(categoryMulter, createCategory);
router.route('/:slug').get(singleCategory).delete(deleteCategory).put(categoryMulter, updateCategory).patch(categoryMulter, updateCategory);



// export category router
module.exports = router;