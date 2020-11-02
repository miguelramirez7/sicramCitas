var passport = require("passport");
var config = require("../database/key");
require("../config/userpassport")(passport);
var jwt = require("jsonwebtoken");
var User = require("../models/user");

//REGISTRO USUARIO
exports.SignupUsuario = async function (req, res) {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      res.json({ success: false, msg: "Por favor, ponga email y contraseña" });
    } else {
      await User.findOne({ email: req.body.email }, async (erro, user) => {
        if (user) {
          res.status(401).json({ msg: "email ya esta siendo usado" });
        } else {
          var newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name,
            lastname: req.body.lastname,
            genero: req.body.genero,
            dni: req.body.dni,
            edad: req.body.edad,
            discapacidad: req.body.discapacidad,
            celular: req.body.celular,
            direccion: req.body.direccion,
          });
        
          // guardamos usuario registrado
          await newUser.save(function (err) {
            if (err) {
              
              return res.json({ success: false, msg: "Username ya existe." });
            }
            res.json({ success: true, msg: "Exito nuevo usuario creado." });
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


//metodo para confirmar que entro un token
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


