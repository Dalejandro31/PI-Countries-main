const { Router } = require('express');
const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = express.Router();
const countriRouter = require('./countriesRouter');
const activityRouter = require('./activityRoutes')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countriRouter);
router.use('/activities',activityRouter);

module.exports = router;
