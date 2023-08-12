const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModels");

const createContact = asyncHandler(async (req, res)=> {

    const {email, phoneNumber, name} = req.body;

    const foundContact = await Contact.findOne({email});
    if(foundContact){
        res.status(404);
        throw new Error(`User with ${foundContact.email} already exist in the database`)
    } 

    if(!email.trim() || !phoneNumber.trim() || !name.trim()){
        res.status(400);
        throw new Error("Fields cannot be null");
    }

    const contact = await Contact.create({
        name,
        email,
        phoneNumber
    })

    res.status(201).json(contact);;
})

const getContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
})

const getContacts = asyncHandler(async (req, res) => {
    
    const contact = await Contact.find();
    res.status(200).json(contact);
})

const putContact = asyncHandler(async (req, res) => {

    const foundContact = await Contact.findById(req.params.id);

    if(!foundContact){
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    res.status(200).json(updatedContact);
})

const delContact = asyncHandler(async (req, res) => {

    const foundContact = await Contact.findByIdAndRemove(req.params.id);

    if(!foundContact){
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(foundContact);
})

module.exports = {createContact, getContact, putContact, delContact, getContacts};