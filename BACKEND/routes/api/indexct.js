var passport = require("passport");
require("../../config/userpassport")(passport);
var express = require("express");
var router = express.Router();
var doctorController = require("../../controller/doctorController");
var citaController = require("../../controller/citaController");
const multer = require("multer");
var path = require("path");
//para ingresar la imgane con multer
const upload = require("../../libs/storage");
//crera un nuevo usuario REGISTANDOTE
router.post("/signupdoctor", doctorController.SignupDoctor);
//LOGEARTE una vez ya tengas tu CUENTA REGISTRADA
router.post("/signindoctor", doctorController.SigninDoctor);
//salir de la cuenta del doctor
router.get(
  "/signoutdoctor",
  passport.authenticate("doctor", { session: false }),
  doctorController.SignoutDoctor
);
//mostrar datos del perfil del doctor
router.get(
  "/doctor/perfil/:id",
  passport.authenticate("doctor", { session: false }),
  doctorController.Obtener_datos_doctor
);
//actualizar datos del doctor logeado
router.post(
  "/doctor/perfil/update/:id",
  passport.authenticate("doctor", { session: false }),
  doctorController.Actualizar_datos_doctor
);

//HORARIOS DEL DOCTOR
router.post(
  "/doctor/horario/agregar/:id",
  passport.authenticate("doctor", { session: false }),
  doctorController.Agregar_horario_doctor
);
// modificar horario del doctors
router.post(
  "/doctor/horario/modificar/:id",
  passport.authenticate("doctor", { session: false }),
  doctorController.Actualizar_horario_doctor
);
// OBTENER HORARIOS DEL MÉDICO POR ID
router.get("/doctor/horarios/:id", doctorController.Obtener_horario_doctor);
//horarios ocupados por id del doctor
router.get(
  "/doctor/horarios_ocupados/:id",
  doctorController.Obtener_horarios_ocupados_doctor
);
//eliminar hoario del doctor
router.post(
  "/doctor/horario/eliminar/:id",
  passport.authenticate("doctor", { session: false }),
  doctorController.Eliminar_horario_doctor
);

//////-----CITAS DEL DOCTOR--------------------------------------------
//listar citas pendientes
router.get(
  "/doctor/cita/listar_pendientes/:id",
  passport.authenticate("doctor", { session: false }),
  doctorController.Obtener_Citas_Doctor
);
//listar citas atendidas
router.get(
  "/doctor/cita/listar_atendidas/:id",
  passport.authenticate("doctor", { session: false }),
  doctorController.Obtener_Citas_Atendidas_Doctor
);
//obtener detalles de una cita de un paciente
router.get(
  "/doctor/cita/detalle/:id",
  doctorController.Obtener_Detalles_De_Cita_De_Un_Paciente
);

//CITAS MANEJADAS POR EL DOCTOR PARA CAMBIAR DE ESTADO DE PENDIENTE A -> ATENDIDO Y A NO ATENDIDO
router.post('/doctor/cita/estado/:id',passport.authenticate('doctor', { session: false}),doctorController.Cambiar_estado_citas)

//------------------ DURANTE EL MEETING--------
//AGREGAR DIAGNOSTICO AL PACIENTE
router.post(
  "/doctor/cita/registrar_diagnostico/:id",
  passport.authenticate("doctor", { session: false }),
  citaController.Registrar_Diagnostico
);

// VER HISTORIAL DE DIAGNOSTICOS/HISTORIAL MEDICO DEL PACIENTE EN UNA CITA
router.post(
  "/doctor/cita/ver_historial_de_paciente/:id",
  passport.authenticate("doctor", { session: false }),
  citaController.Ver_Historial_Paciente
);
// VER DIAGNOSTICO DE ALGUNA CITA PASADa
router.post(
  "/doctor/diagnostico/ver_diagnostico/:id",
  passport.authenticate("doctor", { session: false }),
  citaController.Ver_diagnostico_doctor
);

/// AGREGAR RECETAS
//datos iniciales de la nueva receta
router.post(
  "/doctor/receta/datos/:id",
  passport.authenticate("doctor", { session: false }),
  doctorController.Enviar_Datos_Nueva_Receta
);
//crear nueva receta
router.post(
  "/doctor/receta/crear/:id",
  passport.authenticate("doctor", { session: false }),
  upload.single("firma_imagen"),
  doctorController.Crear_Nueva_Receta
);
//ver receta que el medico receto a un paciente
router.post(
  "/doctor/receta/ver_receta/:id",
  passport.authenticate("doctor", { session: false }),
  citaController.Ver_receta_doctor
);

 
/*----------------------------------------------------------------
----------------historial médico del doctor-----------------------
------------------------------------------------------------------ */
router.get("/doctor/historial/:id",passport.authenticate("doctor", { session: false }),
    citaController.Doctor_historial_medico
);
module.exports = router;
