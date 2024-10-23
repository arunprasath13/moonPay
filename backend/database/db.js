const mongoose = require("mongoose");


// Mongo URL

mongoose.connect("mongodb+srv://arunprasath41d:fullstackdevelopment@cluster0.jpjuw.mongodb.net/todoApp").then(() =>{
    console.log("Mongodb Connected🐦‍🔥")
})


// Create user schema

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName:String,
    lastName:String
});


const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

// Modal


const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
	User,
    Account
};


