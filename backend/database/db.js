const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://arunprasath41d:arun@cluster0.0h2wc.mongodb.net/moonPay").then(() =>{
    console.log("Mongodb Connected🐦‍🔥")
})


const userSchema = new mongoose.Schema({
    username:String,
    password:String,
})

const User = mongoose.model("User",userSchema)

module.exports = {
    User
}