const express = require('express');
const countriRouter = express.Router();
const {getAllCountries, getAll,getId} = require('../handler/CountriesHandler');

countriRouter.get('/',getAll);
countriRouter.get('/name', getAllCountries);
countriRouter.get('/:id', getId);

module.exports = countriRouter;