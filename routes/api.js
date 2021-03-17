const express=require('express');
const router=express.Router();
const usersRouter = require('./users');
const authenticationRouter=require('./auth');


router.use('/auth',authenticationRouter);
router.use('/user',usersRouter)

module.exports = router;

