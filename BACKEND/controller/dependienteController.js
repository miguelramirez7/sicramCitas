var User = require("../models/user");
var Dependiente = require("../models/dependiente");
var Doctor = require("../models/doctor");
var Cita = require("../models/cita");
var Horario = require("../models/horario");
var Especialidad = require("../models/especialidad");
const chalk = require("chalk");
const logger = console.log;
// REGISTRAR NUEVO DEPENDIENTE
exports.Agregar_Dependiente = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        logger(chalk.blue("USUARIO:   ") + chalk.green(req.user.id));
        //encontramos al usuario
        var user = await User.findById(req.params.id);
        console.log(user);
        //nuevo dependiente
        var newDependiente = new Dependiente({
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email,
          genero: req.body.genero,
          dni: req.body.dni,
          edad: req.body.edad,
          discapacidad: req.body.discapacidad,
          celular: req.body.celular,
          direccion: req.body.direccion,
        });
        //agregamos el usuario encontrado en el dependiente
        newDependiente.user = user;
        //save del nuevo dependiente
        await newDependiente.save(async (erro, dependiente) => {
          if (erro) {
            res.json({
              msg: "Error al guardar al dependiente correo ya usado.",
            });
          } else {
            logger(
              chalk.blue("Se guardo dependiente: ") + chalk.green(dependiente)
            );
            //pusheamos el nuevo dependiente al paciente
            user.dependiente.push(dependiente);
            //guardamos user actualizado
            await user.save((err, user) => {
              if (err) {
                res.json({ msg: "Error al guardar al usuario :" });
                throw err;
              } else {
                res.status(200).json({ msg: "Nuevo dependiente guardado" });
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
// MODIFICAR DATOS DE DEPENDIENTE
exports.Modificar_Dependiente = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //ENCONTRAMOS AL USUARIO
        // BUSCAMOS AL DEPENDIENTE POR ID QUE NOS LLEGARÁ POR BODY
        await Dependiente.findById(
          req.body.id_dependiente,
          async (err, dependiente) => {
            if (err) {
              res.json({
                "Error:": err,
              });
            } else {
              //dependiente.name=req.body.name;
              //dependiente.lastname=req.body.lastname;
              dependiente.email = req.body.email;
              dependiente.edad = req.body.edad;
              dependiente.discapacidad = req.body.discapacidad;
              dependiente.celular = req.body.celular;
              dependiente.direccion = req.body.direccion;

              await dependiente.save((err, dependienteUpdate) => {
                if (err) {
                  console.log("Eror", err);
                } else {
                  res.json({ msg: "Familiar actualizado." });
                }
              });

              //console.log("Datos del dependiente", dependiente);
              /*res.json({
                success: true,
                id: dependiente._id,
                nombre: dependiente.name,
                token: "Bearer " + token,
              });*/
            }
          }
        );
      }
    } else {
      return res.status(403).send({ success: false, msg: "  QUE FUE MANO" });
    }
  } catch (err) {
    console.log("Error" + err);
  }
};
// OBTENER TODOS MIS DEPENDIENTES SIENDO PACIENTE
exports.Obtener_Dependientes = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        logger(
          chalk.blue("Obtener dependiente :  ") + chalk.green(req.user.id)
        );
        await Dependiente.find({ user: req.user.id }, (err, dependientes) => {
          if (!dependientes) {
            res.json({ msg: "No se encontro los dependientes" });
          } else {
            res.status(200).json(dependientes);
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
      loggerwin.info("Sin autorizacion");
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  } catch (err) {
    loggerwin.info(err);
    console.log("ERROR  " + err);
  }
};

// ELIMINAR DEPENDIENTE
exports.Eliminar_Dependiente = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        await User.findById(req.user.id, async (err, paciente) => {
          if (!paciente) {
            res.json({ msg: "No se encontro al paciente" });
          } else {
            await Dependiente.findById(
              req.body.id_dependiente,
              async (err, dependiente) => {
                if (!dependiente) {
                  res.json({ msg: "No se encontro dependiente" });
                } else {
                  if (dependiente.cita.length>0) {
                    res.json({
                      msg: "No puede eliminar un dependiente con citas",
                    });
                  } else {
                    logger("dependiente: " + dependiente);
                    const nombre_dependiente = dependiente.name;
                    console.log(
                      "familiares del paciente: " + nombre_dependiente
                    );
                    const depen_de_paciente = paciente.dependiente;
                    console.log(
                      "familiares del paciente: " + depen_de_paciente
                    );
                    const index_dependiente_de_paciente = depen_de_paciente.indexOf(
                      dependiente.id
                    );
                    console.log("INDICE: " + index_dependiente_de_paciente);
                    if (index_dependiente_de_paciente == -1) {
                      res.json({ msg: "Este dependiente no existe" });
                    } else {
                      depen_de_paciente.splice(
                        index_dependiente_de_paciente,
                        1
                      );
                      dependiente.deleteOne();
                      paciente.save();
                      res.json({
                        msg: "Se elimino al familiar: " + nombre_dependiente,
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
          "NO ES EL USUARIO   " +
            req.user.id +
            " comparando con " +
            req.params.id
        );
      }
    } else {
      loggerwin.warn("Sin autorizacion");
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  } catch (err) {
    loggerwin.error(err);
    console.log("ERROR  " + err);
  }
};

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      logger(chalk.green(parted));
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
