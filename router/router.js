const express = require("express")

const router = express.Router()
const {upload} = require("../utlis/multer")

const {proDuct,getAll, getOnePro, searchPro, deleteProduct  } = require("../Controller/productController")
const {Register, LoginUser, getUser,deleteUser,getUserOne } = require("../Controller/userController")

router.post("/product/:userId/add", upload, proDuct)
router.get("/", getUser)
router.get("/product/all", getAll)
router.delete("/product/del/:id", deleteProduct)
router.get("/user/:id", getOnePro)
router.get("/user/auth/user/:id", getUserOne)
router.get("/item", searchPro)
router.post("/reg", Register)
router.post("/login", LoginUser)
router.delete("/user/del/:id", deleteUser)

module.exports = router