const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    image:String,
    caption:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
}, { timestamps: true });


const postModel = mongoose.model("post", postSchema);


module.exports = postModel