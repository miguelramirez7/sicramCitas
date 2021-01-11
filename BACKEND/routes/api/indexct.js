var passport = require("passport");
require("../../config/userpassport")(passport);
var express = require("express");
var router = express.Router();
var doctorController = require("../../controller/doctorController");
var citaController = require("../../controller/citaController");
const multer = require("multer");
var path = require("path");

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

//CITAS DEL DOCTOR
//listar citas pendientes
router.get(
  "/doctor/cita/listar/:id",
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

// DURANTE EL MEETING
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

// GENERAR RECETA - id de la CITA

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/api/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

router.post("/uploadImage", upload.single("firma"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

router.post(
  "/doctor/generar-receta/:id",

  citaController.Generar_Receta
  // passport.authenticate("doctor", { session: false })
);

// GENERAR Sintomas - id de la CITA
router.post(
  "/doctor/generar-sintomas/:id",
  citaController.Generar_Sintoma
  // passport.authenticate("doctor", { session: false })
);

// GENERAR INFORME MEDICO - id de la CITA
router.post(
  "/doctor/generar-informe/:id",
  citaController.Generar_Informe
  // passport.authenticate("doctor", { session: false })
);

// BUSCA INFORME MEDICO EN BASE A LA CITA
router.get(
  "/doctor/obtener-informe/:id",
  citaController.Buscar_Informe
  // passport.authenticate("doctor", { session: false })
);

// BUSCA INFORME MEDICO EN BASE A LA CITA
router.get(
  "/doctor/obtener-sintoma/:id",
  citaController.Buscar_Sintoma
  // passport.authenticate("doctor", { session: false })
);

// BUSCA RECETA EN BASE A LA CITA
router.get(
  "/doctor/obtener-receta/:id",
  citaController.Buscar_Receta
  // passport.authenticate("doctor", { session: false })
);

// router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//   const file = req.file
//   // if (!file) {
//   //   const error = new Error('Please upload a file')
//   //   error.httpStatusCode = 400
//   //   return next(error)
//   // }
//   //   res.send(file.filename)

// })

module.exports = router;
