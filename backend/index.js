const express = require("express");

const app = express();
const {User} = require("./database/db")
const userRouter = require("./routes/user.js")
const accountRouter = require("./routes/account.js")

app.use(express.json())

app.use("/api/v1/user",userRouter)

// app.use("")
app.listen(3000,() => {
    console.log("Server connected")
})

