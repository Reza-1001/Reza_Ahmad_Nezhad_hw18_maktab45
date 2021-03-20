const express=require('express');
const router=express.Router();
const usersRouter = require('./user');
const authenticationRouter=require('./auth');
const generalTools=require('./../tools/general-tools');

router.use('/auth',authenticationRouter);
router.use('/user',generalTools.LoginCheck,usersRouter)
router.use('/delete',generalTools.DeleteUser)

module.exports = router;

