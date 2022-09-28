const { readFileSync, writeFileSync } = require('fs');
const path =  require ('path');


/**
 * @desc get all customers
 * @name GET api/v1/customer/
 * @access public
 */
const getAllCustomer = (req, res) => {

    // get all customers
    const customers = JSON.parse(readFileSync(path.join(__dirname, '../db/customers.json')));

    // send data
    res.status(200).json(customers);

}


/**
 * @desc create customer
 * @name POST api/v1/customer/
 * @access public
 */
 const createCustomer = (req, res) => {

    // get all customers
    const customers = JSON.parse(readFileSync(path.join(__dirname, '../db/customers.json')));
    const { name, email, cell, location, zip_code, shipping_address, billing_address } = req.body;

    // validation
    if( !name || !email || !cell || !location || !zip_code || !shipping_address || !billing_address ){
        res.status(400).json({
            message : "All fields are required"
        });
    }else{

        customers.push({
            id : Math.floor(Math.random() * 1000000).toString(),
            photo : req.file ? req.file.originalname : '',
            name : name,
            email : email,
            cell : cell,
            location : location,
            zip_code : zip_code,
            shipping_address : shipping_address,
            billing_address : billing_address,
        });

        // write new customer to json db
        writeFileSync(path.join(__dirname, '../db/customers.json'), JSON.stringify(customers));
        res.status(201).json({
            message : "New customer created successfully"
        });

    }

    

}


/**
 * @desc single customer
 * @name GET api/v1/customer/
 * @access public
 */
 const singleCustomer = (req, res) => {

    // get all customers
    const customers = JSON.parse(readFileSync(path.join(__dirname, '../db/customers.json')));
    
    // get single id
    const singleCustomer = customers.find( data => data.id == req.params.id );

    if(singleCustomer){
        res.status(200).json(singleCustomer);
    }else {
        res.status(404).json({
            message : "Data not found"
        });
    }

    

    

}


/**
 * @desc delete customer data
 * @name DELETE api/v1/customer/
 * @access public
 */
 const deleteCustomer = (req, res) => {

    // get all customers
    const customers = JSON.parse(readFileSync(path.join(__dirname, '../db/customers.json')));

    if( customers.some( data => data.id == req.params.id ) ){

        const data = customers.filter( data => data.id != req.params.id );

        // write new data to json
        writeFileSync(path.join(__dirname, '../db/customers.json'), JSON.stringify(data));
        res.status(200).json(data);

    }else {
        res.status(404).json({
            message : "Data not found"
        });
    }
    
    
    

}


/**
 * @desc update customer data
 * @name PUT OR PATCH api/v1/customer/
 * @access public
 */
 const updateCustomer = (req, res) => {

    // get all customers
    const customers = JSON.parse(readFileSync(path.join(__dirname, '../db/customers.json')));

    if( customers.some( data => data.id == req.params.id ) ){

        customers[customers.findIndex( data => data.id == req.params.id )] = {
            ...customers[customers.findIndex( data => data.id == req.params.id )],
            ...req.body
        }

        console.log(req.body);

        // write new data to json db
        writeFileSync(path.join(__dirname, '../db/customers.json'), JSON.stringify(customers));

        res.status(200).json({
            message : "Data updated"
        });

    }else {
        res.status(404).json({
            message : "Data not found"
        });
    }
    
    
    

}



// export customer controller
module.exports = {
    getAllCustomer, createCustomer, singleCustomer, deleteCustomer, updateCustomer
}