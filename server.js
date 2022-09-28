const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const customerRouter = require('./routes/customer');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const tagRouter = require('./routes/tag');


// environment variables
const PORT = process.env.PORT || 4000;

// init express
const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded( { extended : false } ));

// api routes
app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/tag', tagRouter);



// listen port
app.listen(PORT, () => {
    console.log(`Server is running on port ${ PORT }`.bgGreen.black);
});