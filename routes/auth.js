const express = require('express');
const router = express.Router();
const url = require('url');
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const generalTools=require('./../tools/general-tools');

router.get('/register',generalTools.SessionCheck,(req, res) => {
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

        NEW_USER.save(err => {
            return res.redirect('/api/auth/login');
        })

    })
})

router.get('/login',generalTools.SessionCheck, (req, res) => {
    res.render('login');
})

router.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.redirect(url.format({
            pathname: "/api/auth/login",
            query: {
                "msg": "Empty Fields"
            }
        }))
    }
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect(url.format({
                pathname: "/api/auth/login",
                query: {
                    "msg": "Server Error"
                }
            }))
        }
        if (!user) {
            return res.redirect(url.format({
                pathname: "/api/auth/login",
                query: {
                    "msg": "User Not Found"
                }
            }))
        }

        bcrypt.compare(req.body.password, user.password, function (err, passCompResult) {
            if (err) {

                return res.redirect(url.format({
                    pathname: "/api/auth/login",
                    query: {
                        "msg": "User Not Foundx"
                    }
                }))
            }
            if (!passCompResult) {
                return res.redirect(url.format({
                    pathname: "/api/auth/login",
                    query: {
                        "msg": "User Not Found"
                    }
                }))
            }
            req.session.user = user;
            res.redirect('/api/user/dashboard');

        })
    })
})


module.exports = router;