const express = require('express');
const router = express.Router();
const url = require('url');
const User = require('./../models/user');


router.get('/register', (req, res) => {
    res.render("register", {
        msg: ''
    });

})
router.post('/register', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.redirect(url.format({
            pathname: "/api/auth/register",
            query: {
                "msg": "Empty Fields"
            }
        }))
    }
    User.findOne({
        username: req.body.username.trim()
    }, (err, user) => {
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
        const NEW_USER = new User({
            username: req.body.username,
            password: req.body.password
        })

        NEW_USER.save()
    })
})


module.exports = router;