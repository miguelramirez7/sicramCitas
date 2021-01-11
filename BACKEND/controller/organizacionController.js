var passport = require("passport");
var config = require("../database/key");
require("../config/userpassport")(passport);
var jwt = require("jsonwebtoken");
var Organizacion = require("../models/organizacion");
var Especialidad = require("../models/especialidad");
const logger = console.log;
exports.SignupOrganizacion = async function (req, res) {
  try {
    if (!req.body.password || !req.body.email) {
      res.json({
        success: false,
        msg: "Por favor, ponga nombre de usuario y contraseña",
      });
    } else {
      //encontrando a la organizacion por su email.
      await Organizacion.findOne(
        { email: req.body.email },
        async (erro, org) => {
          if (org) {
            console.log("Email en uso");
            res.status(401).json({ msg: "email ya esta siendo usado" });
          } else {
            var newOrg = new Organizacion({
              password: req.body.password,
              email: req.body.email,
              nameOrg: req.body.nameOrg,
              direccion: req.body.direccion,
              ruc: req.body.ruc,
            });
            //nueva especialidad q sera guardada en el stack de especialidades de la oganizacion
            /*var especialidad = await Especialidad.findOne({
                 especialidad:req.body.especialidad
              })
              newOrg.especialidad.push(especialidad)*/

            await newOrg.save(function (error, newOrga) {
              if (error) {
                console.log("usuario en uso");
                return res.json({ success: false, msg: "Username ya existe." });
              }
              res.status(200).json({
                success: true,
                msg: "Exito nuevo organizacion creado.",
              });
            });
          }
        }
      );
    }
  } catch (e) {
    console.log("Error" + e);
  }
};

exports.SigninOrganizacion = function (req, res) {
  Organizacion.findOne(
    {
      email: req.body.email,
    },
    function (err, org) {
      if (!org) {
        res.status(401).send({
          success: false,
          msg: "LA AUTENTICACION FALLO USUARIO NO EXISTE",
        });
      } else {
        // check if password matches
        logger(org.password);
        org.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // si el usuario se encuentra y la contraseña  es correcta, crea un token
            logger("ID de la organizcion: " + org.id);
            var token = jwt.sign(org.toJSON(), config.database.secretU, {
              expiresIn: 604800, // 1 semana
            });
            logger("ID de la organizcion: " + org.id);
            // retornamos la informacion incluyendo el token como json
            res.json({ success: true, id: org._id, token: "Bearer " + token });
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

//salir de la cuenta
exports.SignoutOrganizacion = function (req, res) {
  req.logout();
  res.json({ success: true, msg: "Sign out Exitosa." });
};

// Obtener perfil de la organizacion
exports.Obtener_Datos_Organizacion = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        logger("ORGANIZACION:   " + req.user.id);
        var org = await Organizacion.findById(req.params.id);
        res.send(org);
      } else {
        res.send(
          "NO ES EL USUARIO   " +
            req.user.id +
            " comparando con " +
            req.params.id
        );
        logger(
          "NO es el usuario " +
            req.user.id +
            "comparado con " +
            req.params.id
        );
      }
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  } catch (err) {
    
    logger("ERROR: " + err);
  }
};

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      logger(parted);
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
