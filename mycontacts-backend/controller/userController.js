const asyncHandler = require("express-async-handler");

const User = require("../models/userModels");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {

    const {username, email, password} = req.body;

    const foundUser = await User.findOne({email});

    if(foundUser) {
        res.status(400);
        throw new Error(`User with ${foundUser.email} already exist in the database`);
    }
    

    if(!username.trim() || !email.trim() || !password.trim()){
        res.status(404);
        throw new Error(`Field cannot be null`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const registeredUser = await User.create({
        username, 
        email,
        password: hashedPassword,
    })

    if(registeredUser){
        res.status(201).json({_id: registeredUser.id, email: registeredUser.email, message: "Registration succesful"});
    } else {
        res.status(400);
        throw new Error("User registratio not valid");
    }

});

const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    if(!email.trim() || !password.trim()){
        res.status(404);
        throw new Error(`Field cannot be null`);
    }

    const foundUser = await User.findOne({email});

    if(!foundUser){
        res.status(404);
        throw new Error(`User with ${foundUser.email} does not exist`);
    }

    const decodedPassword = await bcrypt.compare(password, foundUser.password)

    if(decodedPassword) {
        const accessToken = jwt.sign(
        {
            foundUser: {
                username: foundUser.email,
                email: foundUser.email,
                id: foundUser.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "30m"
        }
        )
        res.status(201).json({accessToken: accessToken})
    }else{
        res.status(401);
        throw new Error("Email or password is not valid")
    }

    
});

const currentUser = asyncHandler(async (req, res) => {
    console.log(req.user)
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser}