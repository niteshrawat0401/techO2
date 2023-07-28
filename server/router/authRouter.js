const Users = require('../model/user');
const {Router} = require('express');
const bcrypt = require("bcrypt");
const Token = require('../model/token');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = Router();

// Sign up
authRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, email, type, phoneNo, passWord } = req.body;

    let isUniqueEmail = (await Users.countDocuments({ email}) > 0 ? true : false)
  if(isUniqueEmail){
    return res.status(400).json({msg: "Email alredy present", isUniqueEmail})
  }


    const hashPassword = await bcrypt.hash(passWord, 10);
    const newuser = await new Users({
      firstName,
      lastName,
      email,
      type,
      phoneNo,
      passWord: hashPassword
    });
    newuser.save();
    try {
      if (newuser) {
        return res.status(201).json({ msg: "User created", newuser });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Server error", Error :error });
    }
  });


  // Login
authRouter.post("/login", async (req, res) => {
    const user = await Users.findOne({  email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(400).send({ msg: "User not found" });
    }
    try {
        const matchUser = await bcrypt.compare(req.body.passWord, user.passWord);
      if (matchUser) {
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {
          expiresIn: "20m",
        });
        const refreshToken = jwt.sign(
          user.toJSON(),
          process.env.REFRESH_SECRET_KEY
        );
  
        const newToken = new Token({ token: refreshToken });
        await newToken.save();
  
        return res.status(200).send({
            msg: "Login successfully",
            accessToken: accessToken,
            refreshToken: refreshToken,
            name: user.firstName,
            userID : user._id
          });
      }
      else{
          return res.status(400).send({msg: "password does not match"})
      }
    } catch (error) {
      return res.status(500).send({msg: "Server error", Error: error})
    }
  });

  module.exports = authRouter;

  // "firstName": "nitesh",
  // "lastName" : "rawat",
  // "email" : "nitesh@gmail.com",
  // "type" : "admin",
  // "phoneNo" : 1234567898,
  // "passWord": "1234"