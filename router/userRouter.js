const express = require("express")
const router = express.Router()

const {Register} = require("../Controller/userController")

router.post("/register", Register)

module.exports = router