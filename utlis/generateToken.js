const jwt = require("jsonwebtoken")

const generateToken = (user) =>{
    return jwt.sign(user, "qubators", {
      expiresIn:"1d"
    })
}

module.exports = {
  generateToken
}