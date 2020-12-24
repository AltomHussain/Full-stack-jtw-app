const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo")
//Registering
router.post("/register", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body(name, email, password)
    const { name, email, password } = req.body;
    //2. check if user exist (if user exist then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exist");
    }

    //3. Bcrypt the user password using jwt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //4. enter the new user inside the db
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES($1 , $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //  res.json(newUser.rows[0]);
    //5. generating our jwt toke

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//login route

router.post("/login", validInfo, async (req, res) => {
  try {
    //1- destructrue the req.body
    const { email, password } = req.body;
    ////2-check  if user doesn't exist (if not then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
if(user.rows.length===0){
    return res.status(401).json("Password or Email is incorrect or does not exist")
}
    //3-check if incoming password is same as the db password. we're comparing between the password that use entered with the password that exist in the db and will return true or false
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

    if(!validPassword){
res.status(401).json("Password or Email is incorrect")
    }
    //4-give the them jwt token
    const token = jwtGenerator(user.rows[0].user_id);
  res.json({token})


  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
