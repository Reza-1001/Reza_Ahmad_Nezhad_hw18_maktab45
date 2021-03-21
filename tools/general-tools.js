const url = require('url');
const generalTools = {};
const User = require('./../models/user');
const bcrypt = require('bcrypt');
generalTools.SessionCheck = function (req, res, next) {
  if (req.cookies.user_sid && req.session.user) {
    return res.redirect('/api/user/dashboard')
  };

  return next()
};

generalTools.LoginCheck = function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/api/auth/login");
  };
  return next()
};

generalTools.DeleteUser = function (req, res, next) {
  User.findByIdAndDelete(req.session.user._id, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted" + obj);
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.redirect('/api/auth/login');
    });
  });
}
generalTools.PasswordCheck = function (req, res, next) {
  bcrypt.compare(req.body.curr_password, req.session.user.password, function (err, passCompResult) {
    if (!passCompResult) {
      return res.json(false)
    }else{
      return next();
    }
    
  })
}

module.exports = generalTools;