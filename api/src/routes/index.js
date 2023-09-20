const express = require('express');
const routeDiets = require('./routeDiets');
const routeRecipes = require('./routeRecipes');

function routerApp(server){
    const router = express.Router();
    server.use('/api/v2', router);

    router.use('/recipes', routeRecipes);
    router.use('/diets', routeDiets)
}

module.exports = routerApp
