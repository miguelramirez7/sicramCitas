var passport = require("passport");
var config = require("../database/key");
require("../config/userpassport")(passport);
var jwt = require("jsonwebtoken");
var Organizacion = require("../models/organizacion");
var Especialidad = require("../models/especialidad");
exports.SignupOrganizacion = async function (req, res) {
    try {
      if (!req.body.username || !req.body.password || !req.body.email) {
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
                username: req.body.username,
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
                  
                  console.log("ususario en uso");
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
      console.log("Error"+e);
    }
  };