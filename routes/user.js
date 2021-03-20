var express = require('express');
var router = express.Router();
const User = require('./../models/user');
/* GET users listing. */
router.get('/dashboard', (req,res) => {
    res.render('dashboard',{user: req.session.user})
})
router.get('/logout',(req,res)=>{
    // req.logout();
    // res.redirect('/api/auth/login')
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/api/auth/login');
    });
})
router.get('/delete',(req,res)=>{

})

module.exports = router;
 