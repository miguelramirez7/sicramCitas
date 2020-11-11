var passport = require("passport");
var config = require("../database/key");
require("../config/userpassport")(passport);
var jwt = require("jsonwebtoken");
var User = require("../models/user");

//REGISTRO USUARIO
exports.SignupUsuario = async function (req, res) {
  try {
    if (!req.body.password || !req.body.email) {
      res.json({ success: false, msg: "Por favor, ponga email y contraseña" });
    } else {
      await User.findOne({ email: req.body.email },async(err, user) =>{
        if (user) {
          res.status(401).json({ msg: "email ya esta siendo usado" });
        } else {
          var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            lastname: req.body.lastname,
            dni: req.body.dni,
            edad: req.body.edad,
            celular: req.body.celular,
            direccion: req.body.direccion
          });

          await newUser.save((err,nuevous)=>{
            if(err){
              return res.status(500).json({ ok: false, err})
          }
          if(!nuevous){
              return res.status(400).json({ok: false, err});
          }
  
          res.json({nuevous});

          });
        }
      });
    }
  } catch (err) {
    console.log("ERR  " + err);
  }
};

//INGRESO DE USUARIO UNA VEZ SE REGSITRO
exports.SingninUsuario = function (req, res) {
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (!user) {
        res.status(401).send({
          success: false,
          msg: "LA AUTENTICACION FALLO USUARIO NO EXISTE",
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // si el usuario se encuentra y la contraseña  es correcta, crea un token
            var token = jwt.sign(user.toJSON(), config.database.secretU, {
              expiresIn: 604800, // 1 week
            });
            // retornamos la informacion incluyendo el token como json
            res.json({ success: true, id: user._id, token: "Bearer " + token });
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
exports.SignoutUsuario = function (req, res) {
  req.logout();
  res.json({ success: true, msg: "Sign out Exitosa." });
};
//obtener datos del usuario logeado, para su perfil.
exports.Obntener_datos_Paciente = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        var user = await User.findById(req.params.id);
        res.send(user);
      } else {
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
    console.log("ERROR  " + err);
  }
};

//actualizar datos de usuario logeado
exports.Actualizar_datos_Paciente = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //verificar que por parametro colacaste el usuario del paciente
        await User.findById(req.user.id, async (err, paciente) => {
          if (err) {
            res.json({ msg: "Error " + err });
            console.log("Error " + err);
          } else {
            console.log("Paciente: " + paciente);
            paciente.email = req.body.email;
            paciente.direccion = req.body.direccion;
            paciente.edad = req.body.edad;
            paciente.celular = req.body.celular;
            await paciente.save((err, pacienteUpdate) => {
              if (err) {
                res.json({ msg: "Error al guardar el paciente" });
                console.log("Error al guardar paciente" + err);
              } else {
                res.json(pacienteUpdate);
              }
            });
          }
        });
      } else {
        res.json({
          msg:
            "No es el usuario " +
            req.user.id +
            " comparado con" +
            req.params.id,
        });
        console.log("No es el usuario");
      }
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  } catch (err) {
    res.json({ msg: "Error " });
    console.log("Error " + err);
  }
};

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
