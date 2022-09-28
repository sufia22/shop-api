const {  readFileSync, writeFileSync } = require('fs');
const path = require('path');



/**
 * @desc get all categories
 * @name GET api/v1/category
 * @access public
 */
const getAllCategories = (req, res) => {

    // get all categories
    const categories = JSON.parse(readFileSync(path.join(__dirname, '../db/categories.json')));

    // send data
    res.status(200).json(categories);
    
}


/**
 * @desc create category
 * @name POST api/v1/category
 * @access public
 */
 const createCategory = (req, res) => {

    // get all categories
    const categories = JSON.parse(readFileSync(path.join(__dirname, '../db/categories.json')));

    const { name, slug } = req.body;

    // // validation
    if( !name || !slug  ){
        res.status(400).json({
            message : "All fields are required"
        });
    }else {

        categories.push({
            name : name,
            slug : slug,
            photo : req.file ? req.file.originalname : ''
        });

        // write new data to json db
        writeFileSync(path.join(__dirname, '../db/categories.json'), JSON.stringify(categories));

        res.status(201).json({
            message : "Category created"
        });

    }

}


/**
 * @desc single category
 * @name GET api/v1/category/:slug
 * @access public
 */
 const singleCategory = (req, res) => {

    // get all categories
    const categories = JSON.parse(readFileSync(path.join(__dirname, '../db/categories.json')));

    // get single data
    const singleCategory = categories.find( data => data.slug == req.params.slug );

    // validation
    if(singleCategory){
        res.status(200).json(singleCategory);
    }else {
        res.status(404).json({
            message : "Data not found"
        });

    }

}


/**
 * @desc delete category
 * @name DELETE api/v1/category/:slug
 * @access public
 */
 const deleteCategory = (req, res) => {

    // get all categories
    const categories = JSON.parse(readFileSync(path.join(__dirname, '../db/categories.json')));

    if( categories.some( data => data.slug == req.params.slug ) ){

        const data = categories.filter( data => data.slug != req.params.slug );

        // write new data to json db
        writeFileSync(path.join(__dirname, '../db/categories.json'), JSON.stringify(data));
        res.status(200).json(data);

    }else {
        res.status(404).json({
            message : "Data not found"
        });

    }

}


/**
 * @desc update category
 * @name PUT OR PATCH api/v1/category/:slug
 * @access public
 */
 const updateCategory = (req, res) => {

    // get all categories
    const categories = JSON.parse(readFileSync(path.join(__dirname, '../db/categories.json')));

    if( categories.some( data => data.slug == req.params.slug ) ){

        categories[categories.findIndex( data => data.slug == req.params.slug )] = {
            ...categories[categories.findIndex( data => data.slug == req.params.slug )],
            ...req.body
        }

        // write new data to json db
        writeFileSync(path.join(__dirname, '../db/categories.json'), JSON.stringify(categories));
        res.status(200).json({
            message : "Updated Successfully"
        });

    }else {
        res.status(404).json({
            message : "Data not found"
        });

    }

}



// export category controllers
module.exports = {
    getAllCategories, createCategory, singleCategory, deleteCategory, updateCategory
}