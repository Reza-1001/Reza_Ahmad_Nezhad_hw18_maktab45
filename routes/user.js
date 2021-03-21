var express = require('express');
var router = express.Router();
const User = require('./../models/user');
const generalTools = require('./../tools/general-tools');



router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    user: req.session.user
  })
})
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/api/auth/login');
  });
})

router.put("/update/pass", generalTools.PasswordCheck, (req, res) => {
  User.updateOne({
    _id: req.session.user._id
  }, {
    $set: req.body
  }, {
    new: true
  }, (err, user) => {
    if (err) return res.status(500).send("Somthing went wrong in update user! \n" + err);
    return res.json(true)
  })
});
router.put("/update/username", (req, res) => {
  User.findByIdAndUpdate(req.session.user._id, req.body, {
    new: true
  }, (err, user) => {
    if (err) return res.status(500).json(false);
    res.json(true);
  })
});

module.exports = router;