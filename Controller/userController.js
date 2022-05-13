const mongoose = require("mongoose")
const userSchema = require("../Model/user")
const { validateUsers, validateSignIn } = require("../utlis/validate");
const {generateToken} = require("../utlis/generateToken")



const Register = async (req,res) =>{
  try{

      const { error } = validateUsers(req.body);
    if (error) {
       return res.status(409).json({
        status: "Failed to Validate user",
        message: error.details[0].message,
      });
    }

    const {name, password, email} = req.body
    const checkEmail = await userSchema.findOne({email:req.body.email})
    const checkpassword = await userSchema.findOne({email:req.body.password})
    if(checkEmail){
       return  res.status(401).json({msg:"user already register"})
    }
  //  if(checkpassword < 6){
  //     return res.status(401).json({msg:"password is too short"})
  //  }

    const CreateUser = await userSchema.create({
      name,
      email,
      password,
      
     
    })
    res.status(200).json({msg:"user created",data:{ 
      CreateUser,
     token:generateToken({_id:CreateUser._id, name:CreateUser.name})
    
    }})
  }catch(err){
    res.status(400).json({msg:"error creating user",data:err.message})
  }
}

const LoginUser = async (req, res)=>{

  try{
      const { error } = validateSignIn(req.body);
    if (error) {
     return res.status(409).json({
        status: "Can't sign In User",
        message: error.details[0].message,
      });
    }
    const { email, password}= req.body
    
    const user = await userSchema.findOne({email})
    if(user){

      const checkPassword = await user.matchPassword(req.body.password, user.password)
      if(checkPassword){
        const {password, ...info} = user._doc
        const token = generateToken({
          id:user._id,
          email:user.email,
          name:user.email
        })

        res.status(200).json({
          message :`welcome back ${user.name}`,
          data:{...info, token}
        })

      }else{
        res.status(400).json({message:"password is incorrect"})
      }

    }else{
      res.status(400).json({message :"Email doesnt exist"})
    }

  }catch(error){
    res.status(400).json({message : error.message})
  }
  // const {email, password} = req.body
}

const getUser = async (req, res)=>{
  try{
    const getD = await userSchema.find().populate("product")
    res.status(201).json({
      message : "user found",
      data: getD
    })

  }catch(error){
    res.status(400).json({message: error.message})
  }
}

const getUserOne = async (req, res)=>{
  try{
    const getDOne = await userSchema.findById(req.params.id).populate("product")
    res.status(201).json({
      message : "user found",
      data: getDOne
    })

  }catch(error){
    res.status(400).json({message: error.message})
  }
}

const deleteUser = async (req, res) => {
  try {
    const deleteFunc = await userSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Quote Deleted Sucessfully",
      data: deleteFunc,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable TO Delete Data",
      data: error.message,
    });
  }
};


module.exports = {
  Register,
  LoginUser,
  getUser,
  deleteUser,
  getUserOne
}