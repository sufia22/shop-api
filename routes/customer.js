const express = require('express');
const { getAllCustomer, createCustomer, singleCustomer, deleteCustomer, updateCustomer } = require('../controllers/customerController');


// init router
const router = express.Router();


// customer routes
router.route('/').get(getAllCustomer).post(createCustomer);
router.route('/:id').get(singleCustomer).delete(deleteCustomer).put(updateCustomer).patch(updateCustomer);




// export router
module.exports = router;