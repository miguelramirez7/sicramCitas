var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
const mailer = require('../mail/mailer')
var DoctorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
    maxlength: 8,
  },
  edad: {
    type: Number,
    required: true,
  },

  celular: {
    type: Number,
    required: true,
  },
  cmp: {
    type: Number,
    required: true,
  },
  profesion: {
    type: String,
    required: true,
  },
  horario: [
    {
      type: Schema.Types.ObjectId,
      ref: "Horario",
    },
  ],
  especialidad: {
    type: Schema.Types.ObjectId,
    ref: "Especialidad",
  },
  organizacion: {
    type: Schema.Types.ObjectId,
    ref: "Organizacion",
  },
  genero: {
    type: String,
  },
  cita: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cita",
    },
  ],
});

DoctorSchema.pre("save", function (next) {
  var doctor = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(doctor.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        doctor.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

DoctorSchema.pre("deleteOne", function (next) {
  return next();
});

DoctorSchema.pre("mensaje", function (next) {
  console.log("Antes");
  next();
});

DoctorSchema.methods.mensaje = (msg) => {
  console.log(msg);
};

DoctorSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

DoctorSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    console.log(
      "entro: " +
        passw +
        " comparo con " +
        this.password +
        " entro y ismatch" +
        isMatch
    );
    cb(null, isMatch);
  });
};

DoctorSchema.methods.recibirMensaje = function (msg, asunto) {
  console.log("DOCTOR RECIBIENDO:" + msg);
  //------------------------------------------------
  var  doctor = this;
  const email_options = {
    from: "sicram.empresa@gmail.com",
    to: this.email,
    subject: asunto,
    text: msg,
  };

  mailer.sendMail(email_options, function (err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("Se ha enviado un mail a: " + doctor.email + ".");
  });
};

module.exports = mongoose.model("Doctor", DoctorSchema);
