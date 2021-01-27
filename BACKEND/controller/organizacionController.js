var passport = require("passport");
var config = require("../database/key");
require("../config/userpassport")(passport);
var jwt = require("jsonwebtoken");
var Organizacion = require("../models/organizacion");
var Especialidad = require("../models/especialidad");
var Doctor = require("../models/doctor");
const logger = console.log;
const chalk = require("chalk");
const mailer = require("../mail/mediador_mailer");
var pup = require("../tools/scrapers");
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
            mailer.notificarRegistro(`EXITO! en su registro de cuenta.\n\n
            Reciba los cordiales saludos de la familia SICRAM\n
            ORGANICACION ${newOrg.nameOrg} \n
            Agradecemos su aporte en la familia SICRAM ahora podra registrar a sus doctores que ayuden a nuestros pacientes con sus consultas\n
            Solo necesita ingresar a su cuenta y registre a los doctores que cuente su organizacion
            recuerde que podra usted ver el trabajo de sus doctores.\n
            \n
            ORGANICACION ${newOrg.nameOrg}, tome en cuenta de darles las constraseñas y los correos de registro de sus doctores
            con esto sus doctores podran ingresar para realizar las consultas a nuestros pacientes.\n\n\n
            Muchas Gracias Atentamente SICRAM  `,newOrg)

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

exports.Actualizar_Datos_Organizacion = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        //verificar que por parametro colacaste el usuario de la organizacion

        //---------------------------------------------------------------
        await Organizacion.findById(req.user.id, async (err, org) => {
          if (err) {
            logger(
              chalk.blue("Usuario no encontrado aqui el error: ") +
                chalk.red(err)
            );
          } else {
            logger(chalk.blue("Organizacion: ") + chalk.green(org));
            //DATOS A ACTUALIZAR---------------------------
            org.email = req.body.email;
            org.nameOrg = req.body.nameOrg;
            org.direccion=req.body.direccion;
            //--------------------------------------------
            await org.save((err, orgUpdate) => {
              if (err) {
                logger(
                  chalk.blue("Error al guardar paciente :" + chalk.red(err))
                );
              } else {
                res.json({msg:'Datos actualizados', orgUpdate});
              }
            });
          }
        });
        //---------------------------------------------------------------
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
    loggerwin.info(err);
    logger(chalk.red("ERRROR: ")  + chalk.white(err));
  }
   
};

//AGREGAR DOCTOR EN ORGANIZACION tambien puede elegir las especialidades a las que se dirige
exports.Registrar_Doctor_En_Organization = async function (req, res) {
  try {
    var token = getToken(req.headers);
    if (token) {
      if (req.user.id == req.params.id) {
        if (!req.body.password || !req.body.email) {
          res.json({
            success: false,
            msg: "Por favor, ponga email y contraseña del doctor",
          });
        } else {
          //encontrando al doctor por su email.
      await Doctor.findOne({ email: req.body.email }, async (erro, doctor) => {
        try {
          if (doctor) {
            logger(chalk.blue("Email: ") + chalk.green(doctor.email));
            res.status(401).json({ msg: "email ya esta siendo usado" });
          } else {
            //varaiable que contiene los datos del cmp encontrado
            const datosCMP = await pup.scrapeProduct(
              "https://200.48.13.39/cmp/php/detallexmedico.php?id=" +
                req.body.cmp
            );
            //encontramos especialidad 
            var especialidad = await Especialidad.findOne({
              especialidad: req.body.especialidad,
            });
            //encontramos la organizacion qeue esta creando
            var organizacion = await Organizacion.findById(req.user.id)

            logger(chalk.blue("Encontro datos CMP"));
            logger(
              chalk.blue("Datos obtenidos: ") + chalk.green(datosCMP.nombres)
            );

            logger(chalk.blue("Especialidad: ") + chalk.green(especialidad));
            logger(chalk.blue("Organizacion: ") + chalk.green(organizacion));
            //si los nombres del doctor y cmp coinciden
            if (
              req.body.name.toLowerCase() == datosCMP.nombres.toLowerCase() &&
              req.body.lastname.toLowerCase() ==
                datosCMP.apellidos.toLowerCase()
            ) {
              //creamos el nuevo docotor y guaardamos sus datos
              var newDoctor = new Doctor({
                password: req.body.password,
                email: req.body.email,
                name: req.body.name,
                lastname: req.body.lastname,
                dni: req.body.dni,
                edad: req.body.edad,
                genero: req.body.genero,
                celular: req.body.celular,
                cmp: req.body.cmp,
                profesion: req.body.profesion,
              });
              //agregamos el atributo especialidad del doctor agregamos aparte por que especialidad es un Objeto encontrado en la base de datos
              newDoctor.especialidad = especialidad;
              newDoctor.organizacion = organizacion;
              //enviando notificacion de registro de doctor por parte de una organizacion
              mailer.notificarRegistro(
                `EXITO! en su registro de cuenta.\n\n
                Usted es parte de la Organizacion: ${organizacion.nameOrg} y ahora es parte de SICRAM\n
                Reciba los cordiales saludos de la familia SICRAM\n
                DOCTOR SU CUENTA FUE CREADA CON EL SIGUIENTE CORREO:\n
                ${newDoctor.email}\n\n
                Porfavor su contraseña solicitele a su Organizacion ${organizacion.nameOrg}\n
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
              logger(chalk.blue("Nuevo médico: ") + chalk.green(newDoctor));
              //guardamos especialidad
              especialidad.doctor.push(newDoctor);
              organizacion.doctor.push(newDoctor);
              await especialidad.save();
              //guardamos organizacion actualizada con su nuevo doctor
              await organizacion.save();
              
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
      //---------------------------------------------------------------
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
  
  }catch (e) {
    loggerwin.info(e);
    logger(chalk.red("ERR  ") + chalk.white(e));
  }
}
exports.Obtener_Doctores_De_Organizacion = async function (req, res) {
  try {
    var token = getToken(req.headers);
      if (token) {
        //TODO
      if (req.user.id == req.params.id) {
        await Doctor.find({organizacion:req.user.id},(err,doctor)=>{
          if (err){
            //si hay un error en la busqueda
            logger(chalk.red("ERR: ") + chalk.white(err));
            res.status(401).json({ msg: "ERR: "+err });
          }else{
            //ahora enviamos el docotor
            
            logger(chalk.blue("cantidad de doctores de la organizacion: ") + chalk.green(doctor.length));
            res.json(doctor);
          }
        }).populate('especialidad')
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
  }catch (e) {
    
    logger(chalk.red("ERR  ") + chalk.white(e));
  }
}
exports.Eliminar_Doctor = async function (req, res) {
  try {
    console.log(req.headers)
    var token = getToken(req.headers);
      if (token) {
        if (req.user.id == req.params.id) {
          //encontramos al doctor
          await Doctor.findById(req.body.id_doctor,async (err,doctor) => {
            try {
              logger(chalk.blue("datos doctor: ") + chalk.green(doctor));
            if (!doctor) {
              logger(chalk.blue("msg: ")+ chalk.white("no se encontro el doctor"));
              res.status(400).json({ msg: "no se encontro el doctor" });
            }else{
              if(doctor.cita.length>0){
                res.json({msg: "No puede eliminar un doctor con citas"});
              }
              //se encontro al doctor
              logger(chalk.blue("Encontro Doctor: ") + chalk.green(doctor.lastname));
              //condicion que el doctor pertenesca a la organizacion
              if(doctor.organizacion!=req.user.id){
                logger(chalk.blue("msg: ") + chalk.white("doctor: "+doctor.organizacion+" no coincide con organizacion: "+req.user.id));
                res.status(400).json({ msg: "EL DOCTOR NO PERTENCE A LA ORGANIZACION" });
              }else{
                logger(chalk.blue("SI PERTENECE Doctor: ") + chalk.green(doctor.username));
                //encontramos la organizacion q eliminara a un doctor
                await Organizacion.findById(req.user.id,(err,organizacion)=>{

                  if (!organizacion){
                    res.json({ msg: "NO SE ENCONTRO LA ORGANIZACION" });
                  }else{
                    const doctor_temp = organizacion.doctor
                    console.log("DOCTORES DE LA ORGA: "+ doctor_temp);
                    const index_doctor = doctor_temp.indexOf(doctor.id);
                    console.log("INDICE"+index_doctor);
                    doctor_temp.splice(index_doctor,1);
                    doctor.organizacion = null;
                    doctor.save()
                    organizacion.save()
                    res.json({ msg: "Doctor eliminado"});
                  }
                  
                })
              }
            }
            } catch (error) {
              logger(chalk.red("ERROR: ") + chalk.white(error));
            }
          })

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
  }catch (error) {
    logger(chalk.red("ERROR: ") + chalk.white(error));
  }
}


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
