//OBTENIENDO DATOS DEL MODEL
var User = require("../models/user");
var Cita = require("../models/cita");
var Doctor = require("../models/doctor");
var Especialidad = require("../models/especialidad");
var Horario = require("../models/horario");
var Receta = require("../models/receta");
var optk = require("../tools/opentok");
var Diagnostico = require("../models/diagnostico");
const chalk = require("chalk");
const mailer = require("../mail/mediador_mailer");
const logger = console.log;

//generar nueva citas asi es
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
                        const n = new Date();
                        //Año
                        var y = n.getFullYear();
                        //Mes
                        var m = n.getMonth() + 1;
                        //Día
                        var d = n.getDate();
                        const fechaActual = new Date(y, m, d);

                        var fechacita = req.body.fecha;
                        var cy = fechacita.substring(0, 4);
                        var cm = fechacita.substring(5, 7);
                        var cd = fechacita.substring(8, 10);
                        console.log(cy+""+cm+" "+cd);
                        const fechacitac = new Date(cy, cm, cd);
                        if (fechaActual > fechacitac) {
                          res.json({ msg: "Error, fecha pasada" });
                        } else {
                          var horario = await Horario.findOne({
                            fecha: req.body.fecha,
                            hora_inicio: req.body.hora_inicio,
                            hora_fin: req.body.hora_fin,
                            doctor: doctor,
                          });
                          //si horario existe
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

                              await optk.createSession(async (err, session) => {
                                try {
                                  if (err) {
                                    logger(
                                      chalk.red("ERROR: ") + chalk.white(err)
                                    );
                                  } else {
                                    logger(
                                      chalk.blue("sessionID: ") +
                                        chalk.magenta(session.sessionId)
                                    );
                                    var sessiontoken = optk.generateToken(
                                      session.sessionId
                                    );
                                    logger(
                                      chalk.blue("sessiontoken: ") +
                                        chalk.magenta(sessiontoken)
                                    );
                                    var aulaVirtual = {
                                      sessionId: session.sessionId,
                                      sessionToken: sessiontoken,
                                    };
                                    logger(
                                      chalk.blue("aulavirtual: ") +
                                        chalk.magenta(aulaVirtual.sessionId)
                                    );
                                    nuevacita.aulaVirtual = {
                                      sessionId: session.sessionId,
                                      sessionToken: sessiontoken,
                                    };
                                    logger(
                                      chalk.blue("aulavirtual: ") +
                                        chalk.magenta(nuevacita.aulaVirtual)
                                    );
                                    //guardamos nueva cita con su doctor y su usuario respectivo
                                    await nuevacita.save(function (err) {
                                      if (err) {
                                        return res.json({
                                          success: false,
                                          msg: "Error al guardar la cita",
                                        });
                                      }
                                      res.json({
                                        success: true,
                                        msg: "Exito nueva cita creada.",
                                      });
                                    });
                                    mailer.notificarNuevaCita(
                                    `Hola Doctor ${doctor.lastname}, ${doctor.name} \n
                                    reciba nuestros cordiales saludos\n
                                    le informamos que TIENE UNA NUEVA CITA PROGRAMADA\n
                                    Detalles de su nueva cita:\n
                                    paciente: ${paciente.lastname}, ${paciente.name}\n
                                    dni: ${paciente.dni}\n
                                    fecha: ${horario.fecha}\n
                                    hora de inicio: ${horario.hora_inicio}\n
                                    hora de finalizacion: ${horario.hora_fin}\n
                                    
                                    Gracias Doctor ${doctor.lastname} su paciente estara atento para ingresar a la sala virtual en la fecha y hora indicada.
                                    \n
                                    Saludos Atentamente: SICRAM `,
                                      doctor
                                    );
                                    //agregamos la cita para el usuario.
                                    paciente.cita.push(nuevacita);
                                    //agregamos la cita para el doctor
                                    doctor.cita.push(nuevacita);
                                    //guardamos al user con su cita
                                    await paciente.save();
                                    //guardamos al doctor con su cita
                                    await doctor.save();
                                    //guardamos la cita en el horario
                                    horario.cita = nuevacita;
                                    //guardamos al horario con su cita
                                    await horario.save();
                                  }
                                } catch (error) {
                                  logger(
                                    chalk.red("ERROR: ") + chalk.white(error)
                                  );
                                  res.status(400).json({ msg: "ERROR" + error });
                                }
                              });
                              /* Aquí debería ir opentok create session*/
                              //agregamos el token y la session a la citanueva
                              /*await nuevacita.save(function (err) {
                                if (err) {
                                  return res.json({
                                    success: false,
                                    msg: "Error al guardar la cita",
                                  });
                                }
                                res.json({
                                  success: true,
                                  msg: "Exito nueva cita creada.",
                                });
                              });
                              //agregamos la cita para el usuario.
                              paciente.cita.push(nuevacita);
                              //agregamos la cita para el doctor
                              doctor.cita.push(nuevacita);
                              //guardamos al user con su cita
                              await paciente.save();
                              //guardamos al doctor con su cita
                              await doctor.save();
                              //guardamos la cita en el horario
                              horario.cita = nuevacita;
                              //guardamos al horario con su cita
                              await horario.save();
                              */
                            }

                            // res.send(nuevacita);  me sale error de cabecera si hago res.send
                          } else {
                            logger(chalk.red("HORARIO NO COINCIDE "));
                            res.json({ msg: "HORARIO NO COINCIDE" });
                          }
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

//obtener nuevas citas pendientes
exports.Obtener_Citas_Pendientes_Paciente = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        logger(chalk.blue("obtener Cita :  ") + chalk.green(req.user.id));
        await Cita.find(
          { user: req.user.id, estado: 'pendiente' },
          (err, citas) => {
            if (!citas) {
              logger(chalk.red("Cita no encontrada"));
              res.json({ msg: "no encontro las cita" });
            } else {
              res.status(200).json(citas);
            }
          }
        )
          .populate("horario")
          .populate("especialidad")
          .populate("doctor");
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
            req.params.id1
        );
      }
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  } catch (err) {
    loggerwin.info(err);
    logger(chalk.red("ERROR  ") + chalk.white(err));
  }
};

//obtener citas atendidas
exports.Obtener_Citas_Atendidas_Paciente = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        logger(chalk.blue("obtener Cita :  ") + chalk.green(req.user.id));
        await Cita.find(
          { user: req.user.id, estado: {$ne: 'pendiente'} },
          (err, CitasOcupadas) => {
            if (!CitasOcupadas) {
              logger(chalk.red("Cita no encontrada"));
              res.json({ msg: "No encontro las citas" });
            } else {
              res.status(200).json(CitasOcupadas);
            }
          }
        )
          .populate("horario")
          .populate("especialidad")
          .populate("doctor");
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
    logger(chalk.red("ERROR  ") + chalk.white(err));
  }
};

//ACTUALIZAR CITAS MEDIANTE ASYNC AWAIT para que el servidor espere por esta accion
exports.Actualizar_Citas = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        await Cita.findById(req.body.id_cita, async (error, cita) => {
          try {
            if (!cita) {
              res.json({ msg: "No encontramos la cita" });
            } else {
              if (cita.estado == "pendiente") {
                await User.findById(cita.user, async (err, paciente) => {
                  try {
                    if (!paciente) {
                      res.json({ msg: "No es el mismo paciente." });
                    } else {
                      await Doctor.findById(
                        cita.doctor,
                        async (err, doctor) => {
                          try {
                            if (!doctor) {
                              res.json({ msg: "Doctor de cita no encontrado" });
                            } else {
                              await Horario.findById(
                                cita.horario,
                                async (err, horario1) => {
                                  if (!horario1) {
                                    res.json({
                                      msg: "No se encontró el horario",
                                    });
                                  } else {
                                    await Doctor.findById(
                                      req.body._iddoctor,
                                      async (err, doctor2) => {
                                        try {
                                          if (!doctor2) {
                                            res.json({
                                              msg: "Nuevo doctor no encontrado",
                                            });
                                          } else {
                                            await Especialidad.findOne(
                                              {
                                                especialidad:
                                                  req.body.especialidad,
                                              },
                                              async (err, especialidad) => {
                                                if (!especialidad) {
                                                  res.json({
                                                    msg:
                                                      "Nueva especialidad no encontrada",
                                                  });
                                                } else {
                                                  if (
                                                    doctor2.especialidad.equals(
                                                      especialidad._id
                                                    )
                                                  ) {
                                                    await Horario.findOne(
                                                      {
                                                        fecha: req.body.fecha,
                                                        hora_inicio:
                                                          req.body.hora_inicio,
                                                        hora_fin:
                                                          req.body.hora_fin,
                                                        doctor: doctor2,
                                                      },
                                                      async (err, horario) => {
                                                        if (!horario) {
                                                          res.json({
                                                            msg:
                                                              "El horario introducido no existe",
                                                          });
                                                        } else {
                                                          if (
                                                            horario.ocupado ==
                                                            true
                                                          ) {
                                                            res.json({
                                                              msg:
                                                                "El horario se encuentra ocupado",
                                                            });
                                                          } else {
                                                            horario1.ocupado = false;
                                                            horario1.cita = null;
                                                            await horario1.save();

                                                            cita.doctor = doctor2;
                                                            cita.especialidad = especialidad;
                                                            cita.horario = horario;
                                                            await cita.save();

                                                            horario.ocupado = true;
                                                            horario.cita = cita;
                                                            await horario.save();
                                                            res.json({
                                                              msg:
                                                                "Cita actualizada",
                                                            });
                                                          }
                                                        }
                                                      }
                                                    );
                                                  } else {
                                                    res.json({
                                                      msg:
                                                        "El doctor no existe en la especialidad",
                                                    });
                                                  }
                                                }
                                              }
                                            );
                                          }
                                        } catch (err) {
                                          res.json(err);
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          } catch (err) {
                            res.json(err);
                          }
                        }
                      );
                    }
                  } catch (err) {
                    res.json(err);
                  }
                });
              } else {
                res.json({
                  msg: "No se puede actualizar una cita que no esté pendiente.",
                });
              }
            }
          } catch (err) {
            res.json(err);
          }
        });
      } else {
        res.send(
          "NO ES EL USUARIO   " +
            req.user.id +
            " comparando con " +
            req.params.id
        );
        logger(
          chalk.blue("NO es el usuario ") +
            chalk.green(req.user.id) +
            chalk.blue("comparado con ") +
            chalk.magenta(req.params.id)
        );
      }
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  } catch (err) {
    console.log("ERROR  " + err);
  }
};

// ELIMINAR CITAS
exports.Eliminar_cita = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //encontramos la cita por su codigo
        await Cita.findOne({ _id: req.body.id_cita }, async (error, cita) => {
          if (!cita) {
            res.json({ msg: "cita no encontrada" });
          } else {
            await User.findById(cita.user, async (err, paciente) => {
              if (!paciente) {
                res.json({ msg: "No se encuentra al paciente de la cita" });
              } else {
                await Doctor.findById(cita.doctor, async (err, doctor) => {
                  if (!doctor) {
                    res.json({ msg: "Doctor de cita no encontrado" });
                  } else {
                    await Horario.findById(
                      cita.horario,
                      async (err, horario) => {
                        if (!horario) {
                          res.json({
                            msg: "No se encuentra el horario de la cita",
                          });
                        } else {
                          //Encuentro la cita dentro del paciente y la borro
                          const index = paciente.cita.indexOf(cita._id);

                          paciente.cita.splice(index, 1);
                          await paciente.save();
                          //Encuentro la cita dentro del doctor y la borro
                          const indexdoctor = doctor.cita.indexOf(cita._id);

                          doctor.cita.splice(indexdoctor, 1);
                          await doctor.save();

                          //Ahora que las citas están borradas cambio el horario por desocupado
                          horario.ocupado = false;
                          horario.cita = null;
                          await horario.save();
                          mailer.notificarEliminacionDeCita(
                          `Hola Doctor ${doctor.lastname}, ${doctor.name} \n
                          reciba nuestros cordiales saludos\n
                          le informamos que el paciente ${paciente.lastname} ${paciente.name} elimino su cita programada con usted\n
                          Detalles de la cita:
                          paciente: ${paciente.lastname}, ${paciente.name}
                          dni: ${paciente.dni}
                          fecha: ${horario.fecha}\n
                          hora de inicio: ${horario.hora_inicio}\n
                          hora de finalizacion: ${horario.hora_fin}\n
                          
                          Recuerde Doctor ${doctor.lastname} que el horario de esta cita eliminada ahora esta disponible para que otro paciente pueda tomarla.
                          \n
                          Saludos Atentamente: SICRAM `,doctor)

                          //Ahora elimino el documento cita de la colección
                          await cita.remove();

                          res.json({ msg: "Cita eliminada" });
                        }
                      }
                    );
                  }
                });
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
    logger(chalk.red("ERROR  ") + chalk.white(err));
  }
};


// DURANTE EL MEETING

//Registrar los sintomas del paciente
exports.Registrar_Sintomas = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        await Cita.findById(req.body.id_cita, async (err, cita) => {
          if (!cita) {
            res.json({ msg: "No se encontró la cita" });
          } else {
            cita.detalle_sintomas.sintoma = req.body.sintoma;
            cita.detalle_sintomas.tratamiento_reciente =
              req.body.tratamiento_reciente;
            cita.detalle_sintomas.alergia = req.body.alergia;
            cita.detalle_sintomas.detalle_alergia= req.body.detalle_alergia;
            await cita.save();

            res.json("Sintomas agregados");
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
    res.json(err);
  }
};

//El medico puede ver el historial de diagnosticos de un paciente en plena cita
exports.Ver_Historial_Paciente = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //verificar que sea el mismo usuario del token y el de params en la ruta
        await Cita.findById(req.body.id_cita, async (err, cita) => {
          if (err) {
            res.json({ msg: "Cita no encontrada" });
          } else {
            await User.findById(cita.user, async (err, paciente) => {
              if (err) {
                res.json({ msg: "No se encontraron pacientes para esta cita" });
              } else {
                await Cita.find({user: paciente, estado:{$ne:'pendiente'}}, async(err,citas)=>{
                  if(err){
                    res.json(err);
                  }
                  if(citas[0]== null){
                    res.json({msg: "Usted no tiene citas atendidas"})
                  }else{
                    res.json(citas);
                  }
                }).populate({path: "user", select: "email name lastname dni edad celular genero"})
                .populate({path:"diagnostico", select:"diagnostico resultados_labo tratamiento anamnesis"})
                .populate({path:"receta", select: "acto_medico medicamentos fecha_expedicion valida_hasta firma"})
                .populate({path:'doctor', select: 'name lastname email genero dni celular cmp'})
                .populate({path: 'especialidad', select: 'especialidad'})
                .populate({path: 'horario', select: 'fecha hora_inicio hora_fin'});;


                // await Diagnostico.find(
                //   { user: paciente },
                //   async (err, diagnosticos) => {
                //     if (!diagnosticos) {
                //       res.json({
                //         msg:
                //           "No se encontraron diagnósticos para este paciente",
                //       });
                //     } else {
                //       res.json(cita);
                //     }
                //   }
                // );
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
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Que el médico vea el diagnostico de cada cita pasada que tenga
exports.Ver_diagnostico_doctor = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //verificar que sea el mismo usuario del token y el de params en la ruta
        await Cita.findById(req.body.id_cita, async (err, cita) => {
          if (!cita) {
            res.json({ msg: "Cita no encontrada" });
          } else {
            await Diagnostico.findById(
              cita.diagnostico,
              async (err, diagnostico) => {
                if (!diagnostico) {
                  res.json({
                    msg: "No se encontró el diagnóstico de esta cita",
                  });
                } else {
                  res.json(diagnostico);
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
          "NO ES EL USUARIO   " +
            req.user.id +
            " comparando con " +
            req.params.id
        );
      }
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// EL paciente puede ver el diagnostico de una cita pasada
exports.Ver_Diagnostico_Paciente = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //verificar que sea el mismo usuario del token y el de params en la ruta
        await Cita.findById(req.body.id_cita, async (err, cita) => {
          if (!cita) {
            res.json({ msg: "Cita no encontrada" });
          } else {
            await Diagnostico.findById(
              cita.diagnostico,
              async (err, diagnostico) => {
                if (!diagnostico) {
                  res.json({
                    msg: "No se encontró un diagnóstico para esta cita",
                  });
                } else {
                  res.json(diagnostico);
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
          "NO ES EL USUARIO   " +
            req.user.id +
            " comparando con " +
            req.params.id
        );
      }
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
//registrar diagnostico en la cita
exports.Registrar_Diagnostico = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        await Doctor.findById(req.user.id, async (err, doctor) => {
          if (!doctor) {
            res.json({ msg: "No se encontró al doctor" });
          } else {
            await Cita.findById(req.body.id_cita, async (err, cita) => {
              if (err) {
                res.json({ msg: "No se encontró la cita" });
              } else {
                await Diagnostico.findOne(
                  { cita: cita._id },
                  async (err, diagnostico) => {
                    if (!diagnostico) {
                      await Horario.findById(
                        cita.horario,
                        async (err, horario) => {
                          if (!horario) {
                            res.json({
                              msg: "No se encuentra un horario para esta cita",
                            });
                          } else {
                            await User.findById(
                              cita.user,
                              async (err, paciente) => {
                                if (err) {
                                  res.json({
                                    msg:
                                      "No se encontró al paciente de la cita",
                                  });
                                } else {
                                  try {
                                    var newdiagnostico = new Diagnostico({
                                      dni: paciente.dni,
                                      nombres_apellidos:
                                        paciente.name + " " + paciente.lastname,
                                      genero: paciente.genero,
                                      fecha: horario.fecha,
                                      nombres_medico:
                                        doctor.name + " " + doctor.lastname,
                                      edad: paciente.edad,
                                      diagnostico: req.body.diagnostico,
                                      resultados_labo: req.body.resultados_labo,
                                      tratamiento: req.body.tratamiento,
                                      anamnesis: req.body.anamnesis
                                    });

                                    newdiagnostico.cita = cita;
                                    newdiagnostico.user = paciente;
                                    await newdiagnostico.save();
                                    //Introducimos el diagnostico a la cita
                                    cita.diagnostico = newdiagnostico;
                                    await cita.save();

                                    paciente.diagnostico.push(newdiagnostico);
                                    await paciente.save();
                                    res.json({
                                      msg: "Nuevo diagnóstico guardado"
                                    });
                                  } catch (err) {
                                    res.json(err);
                                  }
                                }
                              }
                            );
                          }
                        }
                      );
                    } else {
                      res.json({
                        msg: "Ya existe un diagnóstico para esta cita",
                      });
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


////////////// PARA LAS RECETAS-----------------
//El paciente puede ver su receta
exports.Ver_receta_paciente = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //verificar que sea el mismo usuario del token y el de params en la ruta
        await Cita.findById(req.body.id_cita, async (err, cita) => {
          if (!cita) {
            res.json({ msg: "Cita no encontrada" });
          } else {
            await Receta.findById(cita.receta, async (err, receta) => {
              if (!receta) {
                res.json({ msg: "No se encontraron recetas para esta cita" });
              } else {
                res.json(receta);
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
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

//Ver receta por parte del médico, el médico ve la receta clickeando "Receta" dentro de su historial de citas pasadas, el paciente accede a la receta desde otra ruta
exports.Ver_receta_doctor = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //verificar que sea el mismo usuario del token y el de params en la ruta
        await Cita.findById(req.body.id_cita, async (err, cita) => {
          if (!cita) {
            res.json({ msg: "Cita no encontrada" });
          } else {
            await Receta.findById(cita.receta, async (err, receta) => {
              if (!receta) {
                res.json({ msg: "No se encontraron recetas para esta cita" });
              } else {
                res.json(receta);
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
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

/*---------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
--------------------------------HISTORIALES CLÍNICOS-------------------------------
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------*/ 

// El paciente puede ver su historial clinico de citas pasadas
exports.Paciente_historial_clinico = async function(req,res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //verificar que sea el mismo usuario del token y el de params en la ruta
        await Cita.find({user: req.user.id, estado: {$ne: 'pendiente'}}, async (err, citas) => {
          if(err){
            res.json(err);
          }
          if(citas[0]== null){
            res.json({msg: "Usted no tiene citas atendidas"})
          }else{
            res.json(citas);
          }

        })
        .populate({path: "user", select: "email name lastname dni edad celular genero"})
        .populate({path:"diagnostico", select:"diagnostico resultados_labo tratamiento anamnesis"})
        .populate({path:"receta", select: "acto_medico medicamentos fecha_expedicion valida_hasta firma"})
        .populate({path:'doctor', select: 'name lastname email genero dni celular cmp'})
        .populate({path: 'especialidad', select: 'especialidad'})
        .populate({path: 'horario', select: 'fecha hora_inicio hora_fin'});
      } else {
        console.log("No es el usuario del id");
        res.send("NO ES EL USUARIO   " +req.user.id +" comparando con " +req.params.id);
      }
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

exports.Doctor_historial_medico = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //verificar que sea el mismo usuario del token y el de params en la ruta
        await Cita.find({doctor: req.user.id, estado: {$ne: 'pendiente'}}, async (err, citas) => {
          if(err){
            res.json(err);
          }
          if(citas[0]== null){
            res.json({msg: "Usted no tiene citas atendidas"})
          }else{
            res.json(citas);
          }
        })
        .populate({path: "user", select: "email name lastname dni edad celular genero"})
        .populate({path:"diagnostico", select:"diagnostico resultados_labo tratamiento anamnesis"})
        .populate({path:"receta", select: "acto_medico medicamentos fecha_expedicion valida_hasta firma"})
        .populate({path:'doctor', select: 'name lastname email genero dni celular cmp'})
        .populate({path: 'especialidad', select: 'especialidad'})
        .populate({path: 'horario', select: 'fecha hora_inicio hora_fin'});
      } else {
        console.log("No es el usuario del id");
        res.send("NO ES EL USUARIO   " +req.user.id +" comparando con " +req.params.id);
      }
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

//metodo para confirmar que entro un token
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      console.log(parted);
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};