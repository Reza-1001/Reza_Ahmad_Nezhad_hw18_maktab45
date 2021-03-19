var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/dashboard', (req,res) => {
    res.render('dashboard',{user})
})

module.exports = router;
 