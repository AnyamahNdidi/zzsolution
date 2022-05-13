const mongoose = require("mongoose")


const DATABASE_URL = "mongodb+srv://admin:ilovemusic1234@cluster0.21gv0.mongodb.net/zsolution?retryWrites=true&w=majority"

mongoose.connect(DATABASE_URL).then(()=>{
  console.log("database connect sucessful")
}).catch((error)=>{
  console.log("something is wrong with this connection");
})