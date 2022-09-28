const { readFileSync, writeFileSync } = require('fs');
const path = require('path');


/**
 * @desc get all products
 * @name GET api/v1/product
 * @access public
 */
const getAllProducts = (req, res) => {

    // get all products
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/products.json')));

    // send product data
    res.status(200).json(products);

}


/**
 * @desc create product
 * @name POST api/v1/product
 * @access public
 */
 const createProduct = (req, res) => {

    // get all products
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/products.json')));
    const { name, slug, regular_price, sale_price, stock, short_desc, long_desc, category, tag } = req.body;

    // validation 
    if( !name || !slug || !regular_price || !sale_price || !stock || !short_desc || !long_desc || !category || !tag ){
        res.status(400).json({
            message : "Fields are required"
        });
    }else {

        products.push({
            id : Math.floor(Math.random() * 1000000),
            photo : req.file ? req.file.originalname : '',
            name : name,
            slug : slug,
            regular_price : regular_price,
            sale_price : sale_price,
            stock : stock,
            short_desc : short_desc,
            long_desc : long_desc,
            category : category,
            tag : tag
        });

        // write new data to json db
        writeFileSync(path.join(__dirname, '../db/products.json'), JSON.stringify(products));

        res.status(201).json({
            message : "New product data created successfully"
        });

    }

}


/**
 * @desc single product
 * @name GET api/v1/product/:slug
 * @access public
 */
 const singleProduct = (req, res) => {

    // get all products
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/products.json')));

    // get single id
    const singleProduct = products.find( data => data.slug == req.params.slug );

    // validation 
    if( singleProduct ){
        res.status(200).json(singleProduct);
    }else {
        res.status(404).json({
            message : "Data not found"
        });
    }

}


/**
 * @desc delete product
 * @name DELETE api/v1/product/:slug
 * @access public
 */
 const deleteProduct = (req, res) => {

    // get all products
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/products.json')));

    if( products.some( data => data.slug == req.params.slug ) ){

        const data = products.filter( data => data.slug != req.params.slug );

        // write new data to json db
        writeFileSync(path.join(__dirname, '../db/products.json'), JSON.stringify(data));

        res.status(200).json({
            message : "Data deleted successfully"
        });

    }else {
        res.status(404).json({
            message : "Data not found"
        });
    }

    

}


/**
 * @desc update product
 * @name PUT and PATCH api/v1/product/:slug
 * @access public
 */
 const updateProduct = (req, res) => {

    // get all products
    const products = JSON.parse(readFileSync(path.join(__dirname, '../db/products.json')));

    if( products.some( data => data.slug == req.params.slug ) ){

        products[products.findIndex( data => data.slug == req.params.slug )] = {
            ...products[products.findIndex( data => data.slug == req.params.slug )],
            ...req.body
        }

        // write new data to json db
        writeFileSync(path.join(__dirname, '../db/products.json'), JSON.stringify(products));

        res.status(200).json({
            message : "Data updated"
        });

    }else {
        res.status(404).json({
            message : "Data not found"
        });
    }

    

}






// export product controllers
module.exports = {
    getAllProducts, createProduct, singleProduct, deleteProduct, updateProduct
}