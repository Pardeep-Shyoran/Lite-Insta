const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    profilePic:{
        type:String,
        required:false,
    },
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:false,
    },
})

const userModel = mongoose.model("user", userSchema)


module.exports = userModel