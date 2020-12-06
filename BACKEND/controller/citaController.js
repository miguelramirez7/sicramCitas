//OBTENIENDO DATOS DEL MODEL
var User = require("../models/user");
var Cita = require("../models/cita");
var Doctor = require("../models/doctor");
var Especialidad = require("../models/especialidad");
var Horario = require("../models/horario");
const chalk = require("chalk");
const logger = console.log;

//generar nueva citas
exports.GenerarNuevaCita = async function (req, res) {
    try {
        var token = getToken(req.headers);
        if (token) {
            if (req.user.id == req.params.id) {
                //creando nueva cita
                var nuevacita = new Cita();
                //encontrando al usuario por parametro
                var paciente = await User.findById(req.params.id);
                logger(chalk.green(paciente.username));
          //econtrando al doctor por parametro
          /*var doctor = */ await Doctor.findById(
                    req.body._iddoctor,
                    async (err, doctor) => {
                        try {
                            logger(chalk.green(doctor.username));
                            //encontrando especialidad
                            /*var especialidad = */
                            await Especialidad.findOne(
                                {
                                    especialidad: req.body.especialidad,
                                },
                                async (err, especialidad) => {
                                    try {
                                        //si especialidad existe
                                        if (especialidad) {
                                            logger(
                                                chalk.green(especialidad._id) +
                                                chalk.blue("  COMPARA  ") +
                                                chalk.magenta(doctor.especialidad)
                                            );
                                            //si especialidad es la del doctor
                                            if (doctor.especialidad.equals(especialidad._id)) {
                                                var horario = await Horario.findOne({
                                                    fecha: req.body.fecha,
                                                    hora_inicio: req.body.hora_inicio,
                                                    hora_fin: req.body.hora_fin,
                                                    doctor: doctor,
                                                });
                                                //si horario exisete
                                                if (horario) {
                                                    if (horario.cita) {
                                                        logger(chalk.red("HORARIO USADO"));
                                                        res.json({
                                                            msg: "HORARIO YA ESTA USADO ",
                                                            cita: horario.cita,
                                                        });
                                                    } else {
                                                        logger(
                                                            chalk.blue("HORARIO: ") + chalk.green(horario)
                                                        );
                                                        //horario estara ocupado
                                                        horario.ocupado = true;
                                                        //agregando el doctor y el usuario a la nueva cita
                                                        nuevacita.user = paciente;
                                                        nuevacita.doctor = doctor;
                                                        nuevacita.especialidad = especialidad;
                                                        nuevacita.horario = horario;
                                                        /* Aquí debería ir opentok create session*/
                                                        //agregamos el token y la session a la citanueva

                                                    }

                                                    // res.send(nuevacita);  me sale error de cabecera si hago res.send
                                                } else {
                                                    logger(chalk.red("HORARIO NO COINCIDE "));
                                                    res.json({ msg: "HORARIO NO COINCIDE" });
                                                }
                                            } else {
                                                logger(chalk.red("ESPECIALIDAD NO COINCIDE "));
                                                res.json({
                                                    msg: "La especialidad del doctor no coincide",
                                                });
                                            }
                                        } else {
                                            logger(chalk.red("HORARIO NO ENCONTRADA"));
                                            res
                                                .status(400)
                                                .json({ msg: "especialidad no encontrada" });
                                        }
                                    } catch (error) {
                                        logger(chalk.red("ERROR: ") + chalk.white(error));
                                        res.status(400).json({ msg: "ERROR" + error });
                                    }
                                }
                            );
                        } catch (error) {
                            logger(chalk.red("ERROR: ") + chalk.white(error));
                            res.status(400).json({ msg: "ERROR" + error });
                        }
                    }
                );
            } else {
                logger(
                    chalk.blue("NO es el usuario ") +
                    chalk.green(req.user.id) +
                    chalk.blue("comparado con ") +
                    chalk.magenta(req.params.id)
                );
                res.send(
                    "NO ES EL USUARIO   " +
                    req.user.id +
                    " comparando con " +
                    req.params.id
                );
            }
        } else {
            return res.status(403).send({ success: false, msg: "Unauthorized." });
        }
    } catch (err) {
        logger(chalk.red("ERROR: ") + chalk.white(err));
        logger(chalk.green(req.body._iddoctor));
        res.status(400).json({ msg: "Codigo Doctor no encontrado" });
    }
};