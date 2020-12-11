var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var UserSchema = new Schema({
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
    minlength: 8,
  },
  genero: {
    type: String,
  },
  edad: {
    type: Number,
    required: true,
  },
  celular: {
    type: Number,
    required: true,
  },
  cita: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cita",
    },
  ],
  dependiente: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dependiente",
    },
  ],
});

UserSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

UserSchema.methods.comparePassword = function (passw, cb) {
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

module.exports = mongoose.model("User", UserSchema);
