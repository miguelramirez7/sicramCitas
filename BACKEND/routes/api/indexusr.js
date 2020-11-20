var passport = require('passport');
require('../../config/userpassport')(passport);
var express = require('express');
var router = express.Router();
var userController = require("../../controller/usersCrontroller");
var especialidadController = require("../../controller/especialidadController");

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

//Salir de tu cuenta
router.get('/signoutuser', passport.authenticate('user', { session: false}), userController.SignoutUsuario);

//obtener datos del usuario logeado
router.get('/user/perfil/:id',passport.authenticate('user', { session: false}),userController.Obtener_datos_Paciente);

//actualizar los datos del usuario logeado
router.post('/user/perfil/update/:id',passport.authenticate('user', { session: false}),userController.Actualizar_datos_Paciente);

//ENDPOINTS PARA ESPECIALIDAD---------------------------------
//cargar las primeras especialidades a la base de datos
router.post('/cargarespecialidad',especialidadController.Cargar_Especialidades);
//obtener las especialidades
router.get('/especialidad',especialidadController.Obtener_Especialidades);

module.exports = router;