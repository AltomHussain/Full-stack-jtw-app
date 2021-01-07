//this file checks if teh email is valid or not
module.exports = (req, res, next) =>{
    const { email, name, password } = req.body;
  //this function will check the email if it's valid using the regex
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  //this block of code checks if the values that entered are not empty
  //if there is empty value return missed Credentials
    if (req.path === "/register") {
      console.log(!email.length);
      if (![email, name, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }


    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
  };