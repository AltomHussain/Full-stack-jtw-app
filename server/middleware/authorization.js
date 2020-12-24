//So basically this file is to check if the token that used is correct is not fake one
//or to authorize the person who is using the pp
//Next function checks if everything is okay tells the function to continue

const jwt = require("jsonwebtoken")
require("dotenv").config()//to access the env var and get the secret
module.exports = async (req, res, next) => {
  try {
    //1. destructure the token or get the token from the fetch

    const jwtToken = req.header("token"); //to get the token from the header
    //check if the token exist of not
    if (!token) {
      return res.status(403).json("Not authorized");
    }

    //if you have a token check if it's valid and not just fake one
    //Verify method takes two args 1-token, 2-the secret. 
    //if it's verified it is going to return payload to use in our app
    const payload = jwt.verify(jwtToken, process.env.jwtSecret)
    req.user = payload.user //the user here exist in jwt generator
  } catch (error) {
    console.log(error.message);
    res.status(403).json("You are not authorized");
  }
};
