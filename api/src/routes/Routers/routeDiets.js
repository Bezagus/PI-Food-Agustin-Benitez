const express = require('express');
const { Recipe, Diet } = require('../../db');
const axios = require('axios');
const {getAllApi, getDiets, getApi} = require('../Middleware/middlewares');

const router = express.Router();

router.get('/',async (req, res)=>{
    try{
        const diets= await Diet.findAll();
        res.status(200).json(diets);
    }catch(error){
        res.status(404).send(error)
    }
    
})

module.exports = router;