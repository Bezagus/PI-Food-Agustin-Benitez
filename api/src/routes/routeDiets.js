const express = require('express');
const DietsService = require('../service/service.diets')

const router = express.Router();

const Diets = new DietsService();

router.get('/',async (req, res, next)=>{
    try{
        const allDiets = await Diets.find()
        res.status(200).json(allDiets);
    }catch(error){
        next(error)
    }
    
})

module.exports = router;