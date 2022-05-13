const dotenv = require('dotenv')
// configure dotenv module
dotenv.config()
require('./config/db')
const express = require("express")
const app = express()
const cors = require("cors")
const port  = process.env.PORT || 5050
const bodyParser = require("body-parser");

// app.get("/", ()=>{
//   console.log("api is up and running ");
// })
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/api", require("./router/router"))
// app.use("/user", require("./router/userRouter"))

app.listen(port, ()=>{
  console.log(`up and runnng ${port}`)
})