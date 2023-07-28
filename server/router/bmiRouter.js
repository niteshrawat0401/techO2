const Bmi = require('../model/bmiCalculator');
const {Router} = require('express');

const bmiRouter = Router();

bmiRouter.post('/bmical/:userid', async(req, res)=>{
    const {weight, height} = req.body;
    const {userid} = req.params

    let bmiCalculate = weight / height ^ 2;
    const calculate = await Bmi.create({
        weight,
        height,
        bmiCalculation : bmiCalculate,
        userid : userid
    })
    try {
        if(calculate){
            return res.status(201).json({msg : "Bmi calculated", calculate});
        }
    } catch (error) {
        return res.status(500).json({msg : "server error", Error: error});
    }
})

bmiRouter.get('/getBmiValue/:userid', async(req, res)=>{
    const {userid} = req.params
    const getBmiValue = await Bmi.find({userid})
    try {
        if(getBmiValue){
            return res.status(200).json({msg : "Bmi getBmiValue", getBmiValue});
        }
    } catch (error) {
        return res.status(500).json({msg : "server error", Error :error});
    }
})

module.exports = bmiRouter