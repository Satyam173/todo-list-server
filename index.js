const express = require("express");
const app = express();
require("./db/config");
require("dotenv").config;
const User = require("./db/User");
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/register", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(req.body);
  } catch (error) {
    res.send(error);
  }
});

app.post('/login',async (req,res)=>{
  try {
    if(req.body.email && req.body.password){
      let user = await User.findOne(req.body).select("-password");
      if(user){
        res.send(user)
      }
      else{
        console.log("not found")
      }
    }
    else{
      console.log("Not found")
    }
  } catch (error) {
    console.log(error)
  }
})

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
