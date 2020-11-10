var passport = require('passport');
require('../../config/userpassport')(passport);
var express = require('express');
var router = express.Router();
var organizacionController = require("../../controller/organizacionController");
const { route } = require('./indexusr');

router.get('/',function (req,res) {
  res.render("index",{title:"SICRAM"});  
});


/**ENDPOINTS ORGANIZACION---------------------------------------------------------------------------- */
//crera una nueva organizacion REGISTANDOTE
router.post('/signuporganizacion', organizacionController.SignupOrganizacion);

module.exports = router;