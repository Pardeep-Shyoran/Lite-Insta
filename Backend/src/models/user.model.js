const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    profilePic:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const userModel = mongoose.model("user", userSchema)


module.exports = userModel