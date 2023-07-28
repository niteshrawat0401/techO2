const UserData = require("../model/userData")
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

module.exports = usersDataRouter