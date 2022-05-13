const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")
const {Schema} = mongoose
const bycrpt = require("bcrypt")

const userSchema = mongoose.Schema({

  name:{
    type:String
  },
  email:{
    type:String
  }, 
  password:{
    type:String
  },
  product: [{
        type:Schema.Types.ObjectId,
        ref: 'allProducts'
    }]
},
{timestamps:true}
)

userSchema.methods.matchPassword = async function(enterPassword){
  return await bycrpt.compare(enterPassword, this.password)
}

userSchema.pre('save', async function(next){
  if(!this.isModified){
    next()
  }
  const salt = await bycrpt.genSalt(10)
  this.password = await bycrpt.hash(this.password, salt)
})


module.exports = mongoose.model("users", userSchema)