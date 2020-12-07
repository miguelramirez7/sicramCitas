var passport = require('passport');
require('../../config/userpassport')(passport);
var express = require('express');
var router = express.Router();
var userController = require("../../controller/usersCrontroller");
var especialidadController = require("../../controller/especialidadController");
var dependienteCotroller = require('../../controller/dependienteController');
var citaController = require('../../controller/citaController');
router.get('/', function (req, res) {
  res.render("index", { title: "SICRAM" });
});

//-----------------------------
// ENDPOINT DEL PACIENTE 
//-----------------------------

//crear un nuevo usuario REGISTANDOTE
router.post('/signupuser', userController.SignupUsuario);

//LOGEARTE una vez ya tengas tu CUENTA REGISTRADA
router.post('/signinuser', userController.SingninUsuario);

//Salir de tu cuenta
router.get('/signoutuser', passport.authenticate('user', { session: false }), userController.SignoutUsuario);

//obtener datos del usuario logeado
router.get('/user/perfil/:id', passport.authenticate('user', { session: false }), userController.Obtener_datos_Paciente);

//actualizar los datos del usuario logeado
router.post('/user/perfil/update/:id', passport.authenticate('user', { session: false }), userController.Actualizar_datos_Paciente);

/*--------------------------------------------
-------------ENDPOINT DEL DEPENDIENTE--------
---------------------------------------------*/
// Agregar nuevo dependiente
router.post('/user/dependiente/agregar/:id', passport.authenticate('user', { session: false }), dependienteCotroller.Agregar_Dependiente);
// Modificar dependiente
router.post('/user/dependiente/modificar/:id', passport.authenticate('user', { session: false }), dependienteCotroller.Modificar_Dependiente);
// Listar dependientes
router.get('/user/dependiente/listar/:id', passport.authenticate('user', { session: false }), dependienteCotroller.Obtener_Dependientes);
// Eliminar dependiente
router.post('/user/dependiente/eliminar/:id', passport.authenticate('user', { session: false }), dependienteCotroller.Eliminar_Dependiente)

/*  ----------------------------------------------------------------------
-------------ENDPOINTS PARA CITA DE DEPENDIENTE---------------------------------
 ---------------------------------------------------------------------- */
router.post('/user/dependiente/cita/crear/:id', passport.authenticate('user', { session: false }), dependienteCotroller.Agregar_Cita_Dependiente);
// listar citas por id dependiente 
router.get('/user/dependiente/citas/:id', dependienteCotroller.Obtener_citas_dependiente);


/*  ----------------------------------------------------------------------
-------------ENDPOINTS PARA CITA---------------------------------
 ----------------------------------------------------------------------- */
//crear nueva cita una vez logeado
router.post('/user/cita/crear/:id', passport.authenticate('user', { session: false }), citaController.GenerarNuevaCita);



/*  ----------------------------------------------------------------------
-------------ENDPOINTS PARA ESPECIALIDAD---------------------------------
 ----------------------------------------------------------------------- */
//cargar las primeras especialidades a la base de datos
router.post('/cargarespecialidad', especialidadController.Cargar_Especialidades);
//obtener las especialidades
router.get('/especialidad', especialidadController.Obtener_Especialidades);

//obtener doctores de una especialidad
router.get('/especialidad/doctores',especialidadController.Obtener_Doctores_por_Especialidades);

module.exports = router;