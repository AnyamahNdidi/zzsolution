const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const productSchema = mongoose.Schema({

  make:{
    type:String
  },
  model:{
    type:String
  }, 
  price:{
    type:String
  },
  avatar:{
    type:String
  },
  phone:{
    type:String
  }, 
  email:{
    type:String
  },
  decs:{
    type:String
  },
  millage:{
    type:String
  }, 
  person:{
     type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  }
},
{
  timestamps:true,
}
)

module.exports = mongoose.model("allProducts", productSchema)