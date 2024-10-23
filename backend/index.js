const express = require("express");
const app = express();
const cors = require("cors")
const userRoute = require("./routes/user")
const accountRoute = require("./routes/account")



app.use(express.json())

app.use(cors())


app.use("/api/v1",userRoute)
app.use("/api/v1",accountRoute)


app.listen(3000,() => {
    console.log("Listening")
})
