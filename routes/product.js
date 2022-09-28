const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllProducts, createProduct, singleProduct, deleteProduct, updateProduct } = require('../controllers/productController');


// init router
const router = express.Router();

// multer setup
const productStorage = multer.diskStorage({
    destination : ( req, file, cb ) => {

        cb(null, path.join(__dirname, '../public/images/product'));
    },
    filename : ( req, file, cb ) => {
        
        cb(null, file.originalname);
    }
});

const productMulter = multer({
    storage : productStorage
}).single('photo');


// product routes
router.route('/').get(getAllProducts).post(productMulter, createProduct);
router.route('/:slug').get(singleProduct).delete(deleteProduct).put(productMulter, updateProduct).patch(productMulter, updateProduct);






// export products router
module.exports = router;