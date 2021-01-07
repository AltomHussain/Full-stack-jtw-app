const router = require("express").Router();
module.exports = router;
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    //req.user has the payload
      // res.json(req.user);
    const user = await pool.query("select user_name from users where user_id=$1", [
      req.user,
    ]);
    res.json(user.rows[0]);
  
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});
