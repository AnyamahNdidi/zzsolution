const productSchema =  require("../Model/productModel")
const cloudinary = require("../utlis/cloudinary")
const userShema = require("../Model/user")


const proDuct =async (req, res)=> {
  try{
    const id = req.params.userId
    
    const {make, model, price, millage, phone, email,decs} = req.body

    const image = await cloudinary.uploader.upload(req.file.path)

    const createUser = await productSchema.create({
       make,
       model,
       price,
       millage,
       phone,
       email,
       decs,
       avatar:image.secure_url
    })
    const dUser = await userShema.findById(id)

    createUser.person = dUser

     await createUser.save()

    dUser.product.push(createUser)
   await  dUser.save()
  res.status(201).json({
    message : "product created",
    product:createUser
  })

  }catch(error){
    res.status(400).json({ 
      message: error.message
    })
  }
}

const getAll = async (req, res)=>{
  try{
    const getData = await productSchema.find().populate("person")
    res.status(200).json({ 
      message:"all data",
      data:getData
    })

  }catch(error){
    res.status(400).json({ 
      message : error.message
    })
  }
}

const getOnePro = async (req, res)  =>{
  try{
    const getOne = await productSchema.findById(req.params.id).populate("person");

    if(getOne.length < 1){
      res.status(404).json({
        status :404,
        message : `can't get user ID: ${res.params.id} In Datatbase`
      })
    }else{
      res.status(200).json({
        message:"user Found",
        data:getOne
      })
    }

  }catch(error){
    res.status(400).json({
      message : error.message
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deleteFunc = await productSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Deleted Sucessfully",
      // data: deleteFunc,
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable TO Delete Data",
      data: error.message,
    });
  }
};


const searchPro = async (req, res)=>{
  const keyword = req.query.search
    ? {
        $or: [
          { make: { $regex: req.query.search, $options: "i" } },
          { model: { $regex: req.query.search, $options: "i" } },

          //can not query seacrch number type
          
          // { price: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await productSchema.find(keyword)
  res.send(users);
}

module.exports = {
  proDuct,
  getAll,
  getOnePro,
  searchPro,
  deleteProduct
}