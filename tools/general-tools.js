const url = require('url');
const generalTools = {};
const User = require('./../models/user');

generalTools.SessionCheck = function(req, res, next) {
  if (req.cookies.user_sid && req.session.user) {
    return res.redirect('/api/user/dashboard')
  };

  return next()
};

generalTools.LoginCheck = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect(url.format({
            pathname:"/api/auth/login",
            query: {
               "msg": 'Please Login'
             }
        }));
    };
  
    return next()
  };

   generalTools.DeleteUser=function(req,res,next){
    console.log(req.session.user)
    User.findByIdAndDelete(req.session.user._id, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted" + obj);
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.redirect('/api/auth/login');
        });
      });
 
   }


module.exports = generalTools;