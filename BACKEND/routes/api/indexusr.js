var passport = require('passport');
require('../../config/userpassport')(passport);
var express = require('express');
var router = express.Router();
var userController = require("../../controller/usersCrontroller");

router.get('/',function (req,res) {
    res.render("index",{title:"SICRAM"}); 
  });

//-----------------------------
// ENDPOINT DEL PACIENTE 
//-----------------------------

//crear un nuevo usuario REGISTANDOTE
router.post('/signupuser',userController.SignupUsuario);







module.exports = router;