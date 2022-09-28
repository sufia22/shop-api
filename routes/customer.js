const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllCustomer, createCustomer, singleCustomer, deleteCustomer, updateCustomer } = require('../controllers/customerController');


// init router
const router = express.Router();

// multer setup
const customerStorage = multer.diskStorage({
    destination : ( req, file, cb ) => {

        cb(null, path.join(__dirname, '../public/images/customer'));
    },
    filename : ( req, file, cb ) => {
        cb(null, file.originalname);
    }
});
const customerMulter = multer({
    storage : customerStorage
}).single('photo');



// customer routes
router.route('/').get(getAllCustomer).post(customerMulter, createCustomer);
router.route('/:id').get(singleCustomer).delete(deleteCustomer).put(updateCustomer).patch(updateCustomer);




// export router
module.exports = router;