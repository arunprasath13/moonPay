const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://arunprasath41d:arun@cluster0.0h2wc.mongodb.net/moonPay").then(() =>{
    console.log("Mongodb Connected🐦‍🔥")
})


const userSchema = new mongoose.Schema({
    username:String,
    password:String,
})

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("User",userSchema)
const Account = mongoose.model("Account",accountSchema)

module.exports = {
    User,Account
}