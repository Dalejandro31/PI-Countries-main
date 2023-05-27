const express = require('express');
const activityRouter = express.Router();
const {postActivity, getActivity} = require('../handler/ActivityHandle');

activityRouter.post('/',postActivity);
activityRouter.get('/', getActivity);


module.exports = activityRouter;