var passport = require("passport");
var config = require("../database/key");
require("../config/userpassport")(passport);
var jwt = require("jsonwebtoken");
var Doctor = require("../models/doctor");
var Especialidad = require("../models/especialidad");
var Horario = require("../models/horario");
var Cita = require("../models/cita");
var User = require("../models/user");
var Receta = require("../models/receta");
const chalk = require("chalk");
var pup = require("../tools/scrapers");
const logger = console.log;
const mailer = require("../mail/mediador_mailer");

//para agregar en cloudinary nuestras imagenes
const cloudinary = require("../tools/cloudinary");
const fs = require("fs");
const { json } = require("body-parser");
const { loggers } = require("winston");

//registro doctor
exports.SignupDoctor = async function (req, res) {
  try {
    if (!req.body.password || !req.body.email) {
      res.json({
        success: false,
        msg: "Por favor, ponga nombre de usuario y contraseña",
      });
    } else {
      //encontrando al doctor por su email.
      await Doctor.findOne({ email: req.body.email }, async (erro, doctor) => {
        try {
          if (doctor) {
            res.status(401).json({ msg: "email ya esta siendo usado" });
          } else {
            //variable que contiene los datos del cmp encontrado
            const datosCMP = await pup.scrapeProduct(
              "https://200.48.13.39/cmp/php/detallexmedico.php?id=" +
              req.body.cmp
            );
            var especialidad = await Especialidad.findOne({
              especialidad: req.body.especialidad,
            });

            //si los nombres del doctor y cmp coinciden
            if (
              req.body.name.toLowerCase() == datosCMP.nombres.toLowerCase() &&
              req.body.lastname.toLowerCase() ==
              datosCMP.apellidos.toLowerCase()
            ) {
              //creamos el nuevo docotor y guaardamos sus datos
              var newDoctor = new Doctor({
                password: req.body.password,
                genero: req.body.genero,
                email: req.body.email,
                name: req.body.name,
                lastname: req.body.lastname,
                dni: req.body.dni,
                edad: req.body.edad,
                celular: req.body.celular,
                cmp: req.body.cmp,
                profesion: req.body.profesion,
              });
              mailer.notificarRegistro(
                `EXITO! en su registro de cuenta.\n\n
                Reciba los cordiales saludos de la familia SICRAM\n
                DOCTOR ${newDoctor.lastname}, ${newDoctor.name} \n
                Agradecemos su aporte en la familia SICRAM ahora podra ayudar a nuestros pacientes en sus consultas\n
                Solo necesita ingresar a su cuenta y agregue horarios de su disponibilidad
                con esto nuestros pacientes podran elegirlo para una consulta virtual.\n
                \n
                Doctor ${newDoctor.lastname}, recuerde que cuando un paciente registre una cita con usted
                automaticamente le llegara un correo de informacion de la cita, con sus detalles.\n\n\n
                Muchas Gracias Atentamente SICRAM  `,
                newDoctor
              );

              //agregamos el atributo especialidad del doctor agregamos aparte por que especialidad es un Objeto encontrado en la base de datos
              newDoctor.especialidad = especialidad;
              // guardamos doctor registrado
              await newDoctor.save(function (err) {
                //error al guardar al doctor
                if (err) {
                  return res.json({
                    success: false,
                    msg: "Username ya existe",
                  });
                }
                //si todo estuvo bien respondemos Json
                res.json({
                  success: true,
                  msg: "Bienvenido Doctor, es un nuevo usuario.",
                });
              });
              console.log(newDoctor);
              //guardamos especialidad
              especialidad.doctor.push(newDoctor);
              await especialidad.save();
            } else {
              res.json({
                msg:
                  "LLene los nombres y apellidos, completos y CORRECTOS del doctor",
              });
            }
          }
        } catch (e) {
          return res.status(400).json({
            msg: "CMP INCORRECTO",
          });
        }
      });
    }
  } catch (e) {
    console.log("Error" + e);
  }
};
//ingreso del doctor
exports.SigninDoctor = async function (req, res) {
  Doctor.findOne(
    {
      email: req.body.email,
    },
    function (err, doctor) {
      if (!doctor) {
        res.status(401).send({
          success: false,
          msg: "LA AUTENTICACION FALLO USUARIO NO EXISTE",
        });
      } else {
        doctor.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // si el usuario se encuentra y la contraseña  es correcta, crea un token
            var token = jwt.sign(doctor.toJSON(), config.database.secretU, {
              expiresIn: 604800, // 1 week
            });
            // retornamos la informacion incluyendo el token como json
            res.json({
              success: true,
              id: doctor._id,
              token: "Bearer " + token,
            });
          } else {
            res.status(401).send({
              success: false,
              msg: "LA AUTENTICACION FALLO PASSWORD INCORRECTO ",
            });
          }
        });
      }
    }
  );
};
//salida del doctor que se loggeo
exports.SignoutDoctor = function (req, res) {
  req.logout();
  res.json({ success: true, msg: "Sign out Doctor EXITOSA." });
};
// Actualizar datos del doctor por post
exports.Actualizar_datos_doctor = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        await Doctor.findById(req.user.id, async (err, doctor) => {
          if (!doctor) {
            console.log("Doctor no encontrado");
          } else {
            //Buscamos la especialidad para borrar de esta al médico
            var especialidadEncontrada = await Especialidad.findById(
              doctor.especialidad
            );
            var nuevaEspecialidad = await Especialidad.findOne({
              especialidad: req.body.especialidad,
            });

            if (especialidadEncontrada != nuevaEspecialidad) {
              // Buscamos el médico dentro de la especialidad y hallamos el indice del array
              var indice = especialidadEncontrada.doctor.indexOf(doctor._id);
              // Con el índice que hallamos, ahora borramos ese doctor del array
              especialidadEncontrada.doctor.splice(indice, 1);
              // Guardamos los cambios y se actualiza con un doctor menos
              await especialidadEncontrada.save();
              doctor.especialidad = nuevaEspecialidad;
              //En la nueva especialidad pusheamos al doctor
              nuevaEspecialidad.doctor.push(doctor);
              await nuevaEspecialidad.save();
            }

            //Editamos datos del doctor
            doctor.email = req.body.email;
            doctor.celular = req.body.celular;
            doctor.edad = req.body.edad;

            await doctor.save((err, doctorUpdate) => {
              if (err) {
                console.log("Error al guardar");
                res.send("error al guardar al doctor actualizado :" + err);
              } else {
                res.json({
                  msg: "Doctor actualizado!",
                  doctor: doctorUpdate,
                });
              }
            });
          }
        }).populate("especialidad");
      } else {
        console.log("No es el usuario");
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
    console.log("error" + err);
  }
};
//obtener datos para el perfil del doctor
exports.Obtener_datos_doctor = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        var doctor = await Doctor.findById(req.params.id).populate(
          "especialidad"
        );
        console.log("Doctor" + doctor);
        res.send(doctor);
      } else {
        console.log("No es el usuario");
        res.send(
          "NO ES EL USUARIO    " +
          req.user.id +
          " username :  " +
          req.user.username +
          "  comparando con " +
          req.params.id
        );
      }
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  } catch (error) {
    console.log("Error " + error);
    res.json({ msg: "Error" + error });
  }
};

//HORARIOS del doctor
//agregar stack de horarios
exports.Agregar_horario_doctor = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //encontramos doctor
        var doctor = await Doctor.findById(req.user.id);
        console.log(doctor);
        //confirmando que este horario ya existe
        var horarioEncontrado = await Horario.findOne({
          fecha: req.body.fecha,
          hora_inicio: req.body.hora_inicio,
          hora_fin: req.body.hora_fin,
          doctor: doctor,
        });
        if (horarioEncontrado) {
          res.json({ msg: "YA EXISTE ESE HORARIO PARA EL DOCTOR" });
        } else {
          const n = new Date();
          //Año
          var y = n.getFullYear();
          //Mes
          var m = n.getMonth() + 1;
          //Día
          var d = n.getDate();
          const fechaActual = new Date(y, m, d);

          var fechacita = req.body.fecha;
          // Para la citas
          var cy = fechacita.substring(0, 4);
          var cm = fechacita.substring(5, 7);
          var cd = fechacita.substring(8, 10);

          const fechacitanueva = new Date(req.body.fecha);
          console.log("ffff" + fechacitanueva);
          const fechacitac = new Date(cy, cm, cd);
          console.log("Fecha actual: " + fechaActual);
          console.log("Fecha cita: " + fechacitac);

          if (fechaActual > fechacitac) {
            res.json({ msg: "Error, no puede elegir un horario pasado" });
          } else {
            //nuevo horario agarramos por body los datos

            var newhorario = new Horario({
              fecha: req.body.fecha,
              hora_inicio: req.body.hora_inicio,
              hora_fin: req.body.hora_fin,
            });
            //agregamos el doctor del horario gracias al token
            newhorario.doctor = doctor;
            console.log("Nuevo horario: " + newhorario);
            //guardamos horario
            await newhorario.save((err, horario) => {
              if (err) {
                console.log("Error al guardar horario");
                res.send("error al guardar al horario :" + err);
              } else {
                console.log("Horario guardado");
                res.status(200).json({ msg: "nuevo horario guardado" });
              }
            });
            //pusheamos el areglo de horarios del doctor
            doctor.horario.push(newhorario);
            //guardamos dooctor actualizado
            await doctor.save();
          }
        }
      } else {
        console.log("No es el usuario");
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
    throw err;
  }
};
// Actualizar el horario del doctor
exports.Actualizar_horario_doctor = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        await Horario.findById(req.body.horario_id, async (err, horario) => {
          if (!horario) {
            logger(
              chalk.blue("Horario no encontrado error: ") + chalk.red(err)
            );
          } else {
            //horario encontrado es la coincidencia con el horario que recién están introduciendo, esto sirve para que no hayan 2 horarios con la misma hora así tengan diferentes ids
            var horarioEncontrado = await Horario.findOne({
              fecha: req.body.fecha,
              hora_inicio: req.body.hora_inicio,
              hora_fin: req.body.hora_fin,
            });
            logger(
              "doctor del horario: " +
              horario.doctor._id +
              " es igual a: " +
              req.user.id
            );

            if (!horarioEncontrado) {
              if (horario.doctor._id == req.user.id) {
                if (horario.ocupado == false) {
                  horario.fecha = req.body.fecha;
                  horario.hora_inicio = req.body.hora_inicio;
                  horario.hora_fin = req.body.hora_fin;

                  await horario.save((err, horarioUpdate) => {
                    if (err) {
                      logger(chalk.red("Error al guardar"));
                      res.json({
                        msg: "Error al guardar al doctor actualizado :" + err,
                      });
                    } else {
                      res.json({ msg: "Horario actualizado!" });
                    }
                  });
                } else {
                  res.json({
                    msg:
                      "El horario esta siendo usado en una cita, No se puede Modificar",
                  });
                }
              } else {
                res.json({ msg: "El Horario no pertenece al doctor" });
              }
            } else {
              res.json({ msg: "Este horario ya existe, elige otro" });
            }
          }
        }).populate({
          path: "doctor",
          populate: { path: "organizacion", select: "nameOrg" },
          select: "name & lastname",
        });
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
      loggerwin.info("usuario no autorizado");
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  } catch (err) {
    loggerwin.info(err);
    logger(chalk.red("ERROR:") + chalk.white(err));
  }
};
exports.Obtener_horario_doctor = async function (req, res) {
  try {
    await Doctor.findById(req.params.id, async (err, doctor) => {
      await Horario.find(
        { doctor: req.params.id, ocupado: false },
        (err, horarios) => {
          if (!horarios) {
            res.json({ msg: "no se encontro horarios" });
          }
          res.json(horarios);
        }
      ).populate("doctor");
    });
  } catch (error) {
    res.json({ msg: "id incorrecto, no se encontro doctor" });
  }
};
exports.Obtener_horarios_ocupados_doctor = async function (req, res) {
  try {
    await Doctor.findById(req.params.id, async (err, doctor) => {
      await Horario.find(
        { doctor: req.params.id, ocupado: true },
        (err, horarios) => {
          if (!horarios) {
            res.json({ msg: "No se encontro horarios" });
          }
          res.json(horarios);
        }
      ).populate("doctor");
    });
  } catch (error) {
    res.json({ msg: "id incorrecto, no se encontro doctor" });
  }
};
exports.Eliminar_horario_doctor = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //encotramos al doctor
        await Doctor.findById(req.params.id, async (err, doctor) => {
          if (!doctor) {
            res.json({ msg: "no se encontro doctor" });
          } else {
            //encontramos el horario a eliminar
            await Horario.findOne(
              { _id: req.body.id_horario, doctor: req.user.id },
              (err, horario) => {
                if (!horario) {
                  res.json({ msg: "horario no encontrado" });
                } else {
                  logger("id horario: " + horario.id);
                  const horarios_doctor = doctor.horario;
                  logger("horarios del doctor: " + horarios_doctor);
                  logger("id doctor: " + doctor.id);
                  const indice_temp_horario = horarios_doctor.indexOf(
                    horario.id
                  );
                  logger("indice del Horario: " + indice_temp_horario);
                  if (indice_temp_horario == -1) {
                    res.json({
                      msg: "Horario no pertenece a horarios del doctor",
                    });
                  } else {
                    if (horario.ocupado == false) {
                      horarios_doctor.splice(indice_temp_horario, 1);
                      doctor.save();
                      horario.deleteOne();
                      res.json({ msg: "Se elimino el horario del doctor" });
                    } else {
                      res.json({
                        msg:
                          "El horario esta siendo usado en una cita, No se puede eliminar",
                      });
                    }
                  }
                }
              }
            );
          }
        });
      } else {
        logger(
          chalk.blue("NO es el usuario ") +
          chalk.green(req.user.id) +
          chalk.blue("comparado con ") +
          chalk.magenta(req.params.id)
        );
        res.send(
          "NO ES EL USUARIO    " +
          req.user.id +
          " username :  " +
          req.user.username +
          "  comparando con " +
          req.params.id
        );
      }
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  } catch (error) {
    logger(chalk.red("ERROR:  ") + chalk.white(error));
  }
};

//cambiar esado de citas de pendientes a : atendido o a no atendido
exports.Cambiar_estado_citas = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        await Cita.findOne({ _id: req.body.id_cita }, (err, cita) => {
          if (!cita) {
            logger(chalk.red("CITA NO ENCONTRADA"));
            res.json({ msg: "no se encontro la cita" });
          } else {
            //cambiamos el estado de la cita
            cita.estado = req.body.estado;
            //guardamos los cambios de la cita
            cita.save((erro, cita) => {
              if (erro) {
                logger(chalk.red("ERROR AL GUARDAR"));
                res.json({ msg: "No se pudo guardar el estado" });
              } else {
                logger(chalk.red("ESTADO GUARDADO"));
                res.json({ msg: "Estado guardado", estado: cita.estado });
              }
            });
          }
        });
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
    loggerwin.info(err);
    logger(chalk.red("ERROR") + chalk.white(err));

    throw err;
  }
};
//listar citas pendientes Doctor
exports.Obtener_Citas_Doctor = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        logger(chalk.blue("obtener Citas :  ") + chalk.green(req.user.id));
        await Cita.find({ doctor: req.user.id, estado: 'pendiente' }, (err, citas) => {
          if (!citas) {
            logger(chalk.red("CITA NO ENCONTRADA"));
            res.json({ msg: "no encontro las cita" });
          } else {
            logger(
              chalk.blue("CITA ENCONTRADA: ") + chalk.magenta(citas.length)
            );
            res.status(200).json(citas);
          }
        })
          .populate("horario")
          .populate("especialidad")
          .populate("doctor")
          .populate("user");
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
  }
};
//listar citas atendidas
exports.Obtener_Citas_Atendidas_Doctor = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        logger(chalk.blue("obtener Citas :  ") + chalk.green(req.user.id));
        await Cita.find(
          { doctor: req.user.id, estado: { $ne: 'pendiente' } },
          (err, citas) => {
            if (!citas) {
              logger(chalk.red("CITAs atendidas NO ENCONTRADA"));
              res.json({ msg: "No cuenta con citas atendidas" });
            } else {
              logger(
                chalk.blue("CITAS ATENDIDAS ENCONTRADAS: ") +
                chalk.magenta(citas.length)
              );
              res.status(200).json(citas);
            }
          }
        )
          .populate("horario")
          .populate("especialidad")
          .populate("doctor")
          .populate("user");
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
  }
};

//obtener detalles de la cita de un paciente por parte del doctor de
exports.Obtener_Detalles_De_Cita_De_Un_Paciente = async function (req, res) {
  try {
    await Cita.findById(req.params.id, (err, cita) => {
      if (!cita) {
        res.json({ msg: "No se encontro la cita" });
      } else {
        logger("cita: " + cita._id);
        res.json(cita);
      }
    })
      .populate("user")
      .populate("doctor")
      .populate("horario");
  } catch (err) {
    logger(chalk.red("ERROR: ") + chalk.white(err));
  }
};

/////////CREACION DE LA RECETA-------------------------------
//el obtendra los datos de la cita para colocarlas por defecto a la receta
exports.Enviar_Datos_Nueva_Receta = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //Encontrando al docotor que esta haciendo la cita
        await Doctor.findById(req.user.id, async (err, doctor) => {
          try {
            if (!doctor) {
              logger(
                chalk.red("ERR ") + chalk.white("no se encontro el doctor")
              );
            } else {
              //mensaje encontrando al doctor
              logger(
                chalk.blue("mensaje: ") +
                chalk.green("se encontro al doctor: ") +
                chalk.magenta(doctor.lastname)
              );
              //encontrando cita por ID mandado por Body
              await Cita.findById(req.body.id_cita, async (err, cita) => {
                try {
                  if (!cita) {
                    logger(
                      chalk.red("ERR ") + chalk.white("no se encontro la cita")
                    );
                    logger(chalk.red("ERR ") + chalk.white(err));
                    res.send({ msg: "cita no colocada" });
                  } else {
                    await User.findById(cita.user, async (err, paciente) => {
                      try {
                        await Horario.findById(cita.horario, (err, horario) => {
                          console.log(
                            chalk.blue("nombre del paciente de la receta: ") +
                            chalk.yellow(paciente.name + " " + paciente.lastname)
                          );
                          console.log(
                            chalk.blue("nombre del doctor de la receta: ") +
                            chalk.yellow(doctor.name + " " + doctor.lastname)
                          );
                          res.json({
                            receta: "OK",
                            paciente: paciente.name + " " + paciente.lastname,
                            doctor: doctor.name + " " + doctor.lastname,
                            horario:
                              "De " +
                              horario.hora_inicio +
                              " hasta " +
                              horario.hora_fin,
                            fecha: horario.fecha,
                          });
                        });
                      } catch (error) {
                        logger(chalk.red("ERROR: ") + chalk.white(error));
                        res.send({ msg: "ERROR: " + error });
                      }
                    });
                  }
                } catch (error) {
                  logger(chalk.red("ERROR: ") + chalk.white(error));
                  res.send({ msg: "ERROR: " + error });
                }
              });
            }
          } catch (error) {
            logger(chalk.red("ERROR: ") + chalk.white(error));
            res.send({ msg: "ERROR: " + error });
          }
        });
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
  }
};

exports.Crear_Nueva_Receta = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        await Doctor.findById(req.user.id, async (err, doctor) => {
          if (!doctor) {
            res.json({ msg: "No se encontró al doctor" });
          } else {
            await Cita.findById(req.body.id_cita, async (err, cita) => {
              if (!cita) {
                res.json({ msg: "No se encontró la cita" });
              } else {
                await Receta.findOne(
                  { cita: cita._id },
                  async (err, receta) => {
                    if (!receta) {
                      await User.findById(cita.user, async (err, paciente) => {
                        if (err) {
                          res.json({
                            msg: "No se encontró al paciente de la cita",
                          });
                        } else {
                          try {
                            /*----CARGANDO LA IMAGEN EN CLOUDINARY Y ELIMINANDOLA AUTOMATICAMENTE DE NUESTRO ARCHIVO ESTATICO ----*/
                            const uploader = async (path) =>
                              await cloudinary.uploads(path, "Firmas");
                            //console.log(req.file);
                            const file = req.file;
                            /**--------------------------------------------- */
                            if (file) {
                              const path = file.path;
                              const newUrl = await uploader(path);
                              const firma_imagen = newUrl.url;
                              fs.unlinkSync(path);


                              var newreceta = new Receta({
                                nombres_apellidos:
                                  paciente.name + " " + paciente.lastname,
                                acto_medico: req.body.acto_medico,
                                medicamentos: req.body.medicamentos,
                                fecha_expedicion: req.body.fecha_expedicion,
                                valida_hasta: req.body.valida_hasta,
                                cita: req.body.id_cita,
                                firma: firma_imagen
                              });


                              newreceta.cita = cita;
                              await newreceta.save();

                              cita.receta = newreceta;
                              await cita.save();

                              res.json({ msg: "Nueva receta guardada" });
                            } else {
                              res.json({ msg: "No se detectó ninguna imagen" });
                            }



                          } catch (err) {
                            res.json(err);
                          }
                        }
                      });
                    } else {
                      res.json({ msg: "Ya existe una receta para esta cita." });
                    }
                  }
                );
              }
            });
          }
        });
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
    res.send({ msg: "ERROR: " + err });
  }
};


///////RESPORTES - ESTADISTICAS DEL DOCTOR
//#1
exports.Reporte_Doctores_Por_Especialidad = async function (req, res) {

  try {
    await Especialidad.find(async (err, especialidades) => {

      var repo = [{ especialidad: String, cantDoctor: String }]

      //logger(chalk.green("doctores:" + doctores.length))

      especialidades.forEach(x => {
        repo.push({
          especialidad: x.especialidad,
          cantDoctor: x.doctor.length
        })
        //reporte.push(dato)
        //logger(chalk.green("especialidad: "+x.especialidad+"  doctores:"+x.doctor.length))
      });
      logger(chalk.green(JSON.stringify(repo)))
      res.json({ msg: "REPORTE CANTIDAD DE MEDICOS POR ESPECIALIDAD", reporte: repo })
    })
  } catch (error) {
    logger(chalk.red("ERROR: ") + chalk.white(err));
    res.send({ msg: "error al encontrar especialidades " + err });
  }

}

exports.Reporte_Pacientes_Atendidos_Por_Doctores = async function (req, res) {

  try {

    await Cita.find({estado: "atendido"}, async (err,citas) => {
      try {

        await Doctor.find(async (err,doctores) => {
          var doctoresPorCitasAtendidas = [{doctorId:String,pacientesAtendidos:String}] 
          doctores.forEach(doctor => {
            var c=0
            var docId=null
            doctor.cita.forEach(citadedoctor => {
              
              citas.forEach(cita =>{
                
                if(cita.id == citadedoctor){
                  c++;
                  console.log("cita "+cita.estado+ "docor: " + doctor.id+ " contador "+c)
                  docId=doctor.id
                }
                
              })
              

            })
            if(c!=0 && docId!=null){
              console.log(docId)
              console.log(c)
              doctoresPorCitasAtendidas.push({doctorId:docId,pacientesAtendidos:c})
                  
            }
            
          });
          res.json({msg: "REPORTE CANTIDAD DE PACIENTES POR DOCTORES ",data: doctoresPorCitasAtendidas})    

        })
        
      } catch (error) {
        
      }
    })


  } catch (error) {
    logger(chalk.red("ERROR: ") + chalk.white(err));
    res.send({ msg: "error al encontrar especialidades " + err });
  }

}
exports.Reporte_Citas_Atendidas_En_General = async function (req, res) {

  try {

    await Cita.find({estado: "atendido"}, async (err,citas) => {
      try {

        await Doctor.find(async (err,doctores) => {
          var doctoresPorCitasAtendidas = [{doctorId:String,cantCitas:String}] 
          doctores.forEach(doctor => {
            var c=0
            var docId=null
            doctor.cita.forEach(citadedoctor => {
              
              citas.forEach(cita =>{
                
                if(cita.id == citadedoctor){
                  c++;
                  console.log("cita "+cita.estado+ "docor: " + doctor.id+ " contador "+c)
                  docId=doctor.id
                }
                
              })
              

            })
            if(c!=0 && docId!=null){
              console.log(docId)
              console.log(c)
              doctoresPorCitasAtendidas.push({doctorId:docId,cantCitas:c})
                  
            }
            
          });
          res.json({msg: "REPORTE CANTIDAD DE CITAS ATENDIDAS POR DOCTORES ",data: doctoresPorCitasAtendidas})    

        })
        
      } catch (error) {
        
      }
    })










    // await Doctor.find((err, doctores) => {
    //   var areglo = [{cantCitas:String}]
      
    //   doctores.forEach(async doctor => {
    //     if(doctor.cita.length==0){
    //       //logger(chalk.red("doctor: "+ doctor._id +" no tiene citas "+" :D") + chalk.white())
    //     }else{
            
            

    //         //var citas = await Cita.find({estado:"atendido"})
    //         var cont = 0;

    //         doctor.cita.forEach(async citaxdoctor => {
    //           try { 
    //               //var citaencontrada = 
    //                 await Cita.findById(citaxdoctor,(err,citaencontrada) =>{
                      
    //                   if(citaencontrada.estado=="atendido"){
    //                     cont++;
    //                     doctorActual = doctor.id

    //                     console.log("Actual: " + doctorActual)
    //                     console.log("??: " + citaencontrada.doctor)
    //                     doctorTemporal = doctorActual
    //                     areglo.push({cantCitas:citaencontrada})
    //                     console.log("AREGLO : " + areglo)
    //                     console.log(citaencontrada + " CANTIDAD "+ cont)
    //                   }

    //                 })    
              
    //           } catch (error) {
                
    //           }

    //         })
           
            
    //       }
          
    //     }
        
    //   );
    //   console.log("ASDJASDALSKDJLASDJLKADJ"+ JSON.stringify(areglo))
    //   res.json(areglo)
      
     
    //   //citas.forEach(element => {
    //   //   logger(chalk.green("estado cita: "+ element.estado))
    //   // });
    //   // var citaxdoctor = [{doctor:String,cantCitas:String}]
    //   // var dc = null
    //   // var cant = 0
    //   // citas.forEach(async cita => {
    //   //   logger(chalk.red("citas: "+cita._id))
    //   //   try {

    //   //     var nombreDoctores=[]
    //   //     var comparacion = []
    //   //     await Doctor.findById(cita.doctor, async (err, doctor) => {
            
    //   //       nombreDoctores.push(doctor.name)
            
    //   //     })
    //   //     nombreDoctores.forEach(x => {
    //   //       if(comparacion.find(e => e==x)){

    //   //       }
    //   //       comparacion.push(x)
    //   //     });
    //   //     logger(chalk.green(nombreDoctores))
    //   //   } catch (error) {
    //   //     logger(chalk.red("ERROR: ") + chalk.white("NO ENCONTRO DOCTOR"))
    //   //   }
    //   // });
     
      


    // })//.populate({ path: 'doctor', select: 'name' })
  } catch (error) {
    logger(chalk.red("ERROR: ") + chalk.white(err));
    res.send({ msg: "error al encontrar especialidades " + err });
  }
}

exports.Reporte_Pacientes_Atendidos_Por_Especialidad = async function (req, res) {

  try {
    await Cita.find({estado: "atendido"}, async (err,citas) => {
      try {
        await Doctor.find(async (err,doctores) => {
          try {
            await Especialidad.find(async (err, especialidades)=>{

            var doctoresPorCitasAtendidas = [{doctorId:String,cantCitas:String,especialidad:String}] 

            doctores.forEach(doctor => {
            var c=0
            var docId=null
            var espe=null
            doctor.cita.forEach(citadedoctor => {
              
              citas.forEach(cita =>{
                
                if(cita.id == citadedoctor){
                  c++;
                  especialidades.forEach(esp=>{
                    
                  if(doctor.especialidad==esp.id){
                    //console.log(esp.especialidad)
                    espe=esp.especialidad
                  }
                  })
                  console.log("cita "+cita.estado+ "docor: " + doctor.id+ " contador "+c)
                  docId=doctor.id
                  }
                
                
                
              })
              

            })
            if(c!=0 && docId!=null){
              console.log(docId)
              console.log(c)
              console.log(espe)
              doctoresPorCitasAtendidas.push({doctorId:docId,cantCitas:c,especialidad:espe})
              console.log(doctoresPorCitasAtendidas)
            }
            
          });
          res.json({msg: "REPORTE CANTIDAD DE CITAS ATENDIDAS POR ESPECIALIDAD DE DOCTOR",data: doctoresPorCitasAtendidas})    
            })
            
          
          } catch (error) {
            
          }
          

        })
        
      } catch (error) {
        
      }
    })

  } catch (error) {
    logger(chalk.red("ERROR: ") + chalk.white(err));
    res.send({ msg: "error al encontrar especialidades " + err });
  }
}

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};




