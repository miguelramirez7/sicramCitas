var passport = require("passport");
var config = require("../database/key");
require("../config/userpassport")(passport);
var jwt = require("jsonwebtoken");
var Doctor = require("../models/doctor");
var Especialidad = require("../models/especialidad");
const chalk = require("chalk");
var pup = require("../tools/scrapers");


//registro doctor
exports.SignupDoctor = async function (req, res) {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
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
                username: req.body.username,
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
                  msg: "Bienvenido Doctor, es un nuevo usario.",
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
    console.log("Error"+e);
  }
};
//ingreso del doctor logeado
exports.SigninDoctor = async function (req, res) {
  Doctor.findOne(
    {
      email: req.body.email,
    },
    function (erro, doctor) {
      if (!doctor) {
        loggerwin.info("El auntenticacion del usuario fallo");
        res.status(401).send({
          success: false,
          msg: "LA AUTENTICACION FALLO USUARIO NO EXISTE",
        });
      } else {
        logger(chalk.blue("especialidad ") + chalk.green(doctor.especialidad));
        // comparando password verificando
        logger(chalk.blue("Password:") + chalk.green(req.body.password));
        doctor.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            logger(chalk.blue("ID:") + chalk.green(doctor.id));
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
            loggerwin.info(
              "El auntenticacion del usuario fallo : password incorrecto"
            );
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
//salida del doctor
exports.SignoutDoctor = function (req, res) {
  req.logout();
  res.json({ success: true, msg: "Sign out Doctor EXITOSA." });
};





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