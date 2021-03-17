const express = require('express');
const router = express.Router();
const url = require('url');
const user = require('./../models/user');
router.get('/register', (req, res) => {
    res.render("register", {
        msg: ''
    }); 

})
router.post('/registerpage', (req, res) => {
    if (!req.body.userName || !req.body.pass) {
        return res.redirect(url.format({
            pathname: "/api/auth/register",
            query: {
                "msg": "Empty Fields"
            }
        }))
    }
    user.findOne({username :req.body.username.trim()},(err,user) => {
        if (err) {
            return res.redirect(url.format({
                pathname: "/api/auth/register",
                query: {
                    "msg": "Server Error"
                }
            }))
        } 
        if (user) {
            return res.redirect(url.format({
                pathname: "/api/auth/register",
                query: {
                    "msg": "Username Already Exists"
                }
            }))
        } 
        new user ({
            username: req.body.username,
            password: req.body.password
        }).save();
    })
})


module.exports = router;