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
        phoneNumber,
        user_id: req.user.id
    })

    res.status(201).json(contact);;
})

const getContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if(req.user.id !== contact.user_id.toString()){
        res.status(400);
        throw new Error("You don't have the right access");
    }

    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
})

const getContacts = asyncHandler(async (req, res) => {
    
    const contact = await Contact.find({user_id: req.user.id});

    if(!contact){
        res.status(401);
        throw new Error(`User with ${req.user.id} does not exist`);
    }

    if(req.user.id !== contact.user_id.toString()){
        res.status(403);
        throw new Error("You don't have the right access");
    }

  
    res.status(200).json(contact);
})

const putContact = asyncHandler(async (req, res) => {

    const foundContact = await Contact.findById(req.params.id);

    if(!foundContact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(req.user.id !== foundContact.user_id.toString()){
        res.status(403);
        throw new Error("You don't have the right access");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    res.status(200).json(updatedContact);
})

const delContact = asyncHandler(async (req, res) => {

    const foundContact = await Contact.findById(req.params.id);

    if(!foundContact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(req.user.id !== foundContact.user_id.toString()){
        res.status(403);
        throw new Error("You don't have the right access");
    }

    await Contact.deleteOne({_id: req.params.id})

    res.status(200).json(foundContact);
})

module.exports = {createContact, getContact, putContact, delContact, getContacts};