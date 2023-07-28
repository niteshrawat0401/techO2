const Users = require('../model/user');
const {Router} = require('express');
const bcrypt = require("bcrypt");
const Token = require('../model/token');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = Router();

// Sign up
authRouter.post("/signup", async (req, res) => {
    const { name, email, passWord } = req.body;
    const hashPassword = await bcrypt.hash(passWord, 10);
    const newuser = await new Users({
      name,
      email,
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
    const user = await Users.findOne({  name: req.body.name });
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
            name: user.name,
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