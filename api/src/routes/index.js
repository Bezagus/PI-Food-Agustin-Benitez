const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');s
const routeDiets = require('./Routers/routeDiets');
const routeRecipes = require('./Routers/routeRecipes');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', routeRecipes);
router.use('/diets', routeDiets);



module.exports = router;
