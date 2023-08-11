const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModels");

const createContact = asyncHandler(async (req, res)=> {
    const {email, phoneNumber, name} = req.body;

    if(!email.trim() || !phoneNumber.trim() || !name.trim()){
        res.status(400);
        throw new Error("Fields cannot be null");
    }

    res.status(200).json({message: "Contacts created successfully"});;
})

const getContact = asyncHandler(async (req, res) => {
    
    res.status(200).json({message: `Get contact for ${req.params.id}`});
})

const getContacts = asyncHandler(async (req, res) => {
    
    const contact = await Contact.find();
    res.status(200).json({message: `Get all contacts`});
})

const putContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Contact updated for id: ${req.params.id}`});;
})

const delContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Contact deleted for id: ${req.params.id} `});;
})

module.exports = {createContact, getContact, putContact, delContact, getContacts};