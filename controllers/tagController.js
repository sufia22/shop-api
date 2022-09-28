const { json } = require('body-parser');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');


/**
 * @desc get all tags
 * @name GET api/v1/tag
 * @access public
 */
const getAllTags = (req, res) => {
    
    // get all tags
    const tags = JSON.parse(readFileSync(path.join(__dirname, '../db/tags.json')));

    // send data
    res.status(200).json(tags);

}


/**
 * @desc create tag
 * @name POST api/v1/tag
 * @access public
 */
 const createTag = (req, res) => {
    
    // get all tags
    const tags = JSON.parse(readFileSync(path.join(__dirname, '../db/tags.json')));
    const { name, slug } = req.body;

    // validation
    if( !name || !slug ){
        res.status(400).json({
            message : "Fields are required"
        });
    }else {

        tags.push({
            name : name,
            slug : slug
        });

        // write new data to json db
        writeFileSync(path.join(__dirname, '../db/tags.json'), JSON.stringify(tags));

        res.status(201).json({
            message : "Data created successfully"
        });

    }

    

}


/**
 * @desc single tag
 * @name GET api/v1/tag/:slug
 * @access public
 */
 const singleTag = (req, res) => {
    
    // get all tags
    const tags = JSON.parse(readFileSync(path.join(__dirname, '../db/tags.json')));
    const singleTag = tags.find( data => data.slug == req.params.slug );

    // validation
    if( singleTag ){
        res.status(200).json(singleTag);
    }else {
        res.status(404).json({
            message : "Data not found"
        });
    }

}


/**
 * @desc delete tag
 * @name DELETE api/v1/tag/:slug
 * @access public
 */
 const deleteTag = (req, res) => {
    
    // get all tags
    const tags = JSON.parse(readFileSync(path.join(__dirname, '../db/tags.json')));

    if( tags.some( data => data.slug == req.params.slug ) ){

        const data = tags.filter( data => data.slug != req.params.slug );

        // write new data to json db
        writeFileSync(path.join(__dirname, '../db/tags.json'), JSON.stringify(data));

        res.status(200).json({
            message : "Data deleted"
        });

    }else {
        res.status(404).json({
            message : "Data not found"
        });
    }

}


/**
 * @desc update tag
 * @name PUT OR PATCH api/v1/tag/:slug
 * @access public
 */
 const updateTag = (req, res) => {
    
    // get all tags
    const tags = JSON.parse(readFileSync(path.join(__dirname, '../db/tags.json')));

    if( tags.some( data => data.slug == req.params.slug ) ){

        tags[tags.findIndex( data => data.slug == req.params.slug )] = {
            ...tags[tags.findIndex( data => data.slug == req.params.slug )],
            ...req.body
        }

        // write new data to json db
        writeFileSync(path.join(__dirname, '../db/tags.json'), JSON.stringify(tags));

        res.status(200).json({
            message : "Data updated"
        });

    }else {
        res.status(404).json({
            message : "Data not found"
        });
    }

}




// export tags controllers
module.exports = {
    getAllTags, createTag, singleTag, deleteTag, updateTag
}