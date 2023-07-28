const UserData = require("../model/userData")
const User = require('../model/user')
const {Router} = require('express');

const usersDataRouter = Router();

usersDataRouter.post('/createData/:userid', async(req, res)=>{
    const {firstName, lastName, email, type, phoneNo} = req.body;
    const {userid} = req.params
    console.log(userid);

    const createUserData = await UserData.create({
        firstName,
        lastName,
        email ,
        type ,
        phoneNo,
        userid : userid
    })
    console.log(createUserData);
    try {
        if(createUserData){
            return res.status(201).json({msg : "createUserData", createUserData});
        }
    } catch (error) {
        return res.status(500).json({msg : "server error", Error: error});
    }
})

usersDataRouter.get('/getUserData/:userid', async(req, res)=>{
    const {userid} = req.params
    const getUserData = await UserData.find({userid})
    try {
        if(getUserData){
            return res.status(200).json({msg : "getUserData", getUserData});
        }
    } catch (error) {
        return res.status(500).json({msg : "server error", Error :error});
    }
})

// getAll
usersDataRouter.get('/getAll', async(req, res)=>{
    const getUserData = await User.find({})
    try {
        if(getUserData){
            return res.status(200).json({msg : "getUserData", getUserData});
        }
    } catch (error) {
        return res.status(500).json({msg : "server error", Error :error});
    }
})

// Delete
usersDataRouter.delete('/delete/:id', async(req, res)=>{
    const {id} = req.params
    const deleteUserData = await User.findByIdAndRemove({_id : id})
    console.log(deleteUserData);
    try {
        if(deleteUserData){
            return res.status(200).json({msg : "deleteUserData", deleteUserData});
        }
    } catch (error) {
        return res.status(500).json({msg : "server error", Error :error});
    }
})

module.exports = usersDataRouter