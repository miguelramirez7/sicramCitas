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

//LOGEARTE una vez ya tengas tu CUENTA REGISTRADA
router.post('/signinuser', userController.SingninUsuario);





module.exports = router;