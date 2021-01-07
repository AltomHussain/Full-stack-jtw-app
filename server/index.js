const express = require("express")
const app = express();
const cors = require("cors");



//middleware
app.use(express.json())
//use cors() to make BE interact with FE
app.use(cors())

//Dashboard route
app.use("/dashboard", require("./routes/dashboard"))


//Routes//

//Resgister and login routes
app.use("/auth", require("./routes/jwtAuth"))

app.listen(5000, ()=>{
    console.log("server is running on port 5000")
})