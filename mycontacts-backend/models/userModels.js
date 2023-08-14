const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    
    username:{
        type: String,
        required: [true, "Please add your name"]
    },

    email: {
        type: String,
        require: [true, "Please add your email address"],
        unique: [true, "Email address already taken"]
    },

    password: {
        type: String,
        require: [true, "Please add your password"]
    }

}, 
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);