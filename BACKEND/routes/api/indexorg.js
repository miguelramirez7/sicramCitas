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
//crear una nueva organizacion REGISTANDOTE
router.post('/signuporganizacion', organizacionController.SignupOrganizacion);

//LOGEARTE una vez ya tengas tu CUENTA REGISTRADA
router.post('/signinorganizacion', organizacionController.SigninOrganizacion);

//salir de la cuenta de la orga
router.get('/signoutorganizacion', passport.authenticate('organizacion', { session: false}), organizacionController.SignoutOrganizacion);

//mostrar datos del perfil de la orga
router.get('/organizacion/perfil/:id', passport.authenticate('organizacion', { session: false}), organizacionController.Obtener_Datos_Organizacion);

//actualizar datos de la organizacion logeada
router.post('/organizacion/perfil/update/:id',passport.authenticate('organizacion', { session: false}),organizacionController.Actualizar_Datos_Organizacion);


/* ---------------------------------------------------------------------
--------------ENDPOINTS DE DOCTORES DE ORGANIZACIÓN---------------------
----------------------------------------------------------------------*/
//AGREGAR DOCTOR EN ORGANIZACION tambien puede elegir las especialidades a las que se dirige
//agregar doctor ------
router.post('/organizacion/doctor/registrar/:id',passport.authenticate('organizacion', { session: false}),organizacionController.Registrar_Doctor_En_Organization);
//obtener docotres de la organizacion
router.get('/organizacion/doctor/obtener/:id',passport.authenticate('organizacion', {session: false}),organizacionController.Obtener_Doctores_De_Organizacion)
//eliminar doctor de la organizacion
router.post('/organizacion/doctor/eliminar/:id',passport.authenticate('organizacion', { session: false}),organizacionController.Eliminar_Doctor)
module.exports = router;