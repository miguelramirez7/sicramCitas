var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SymptomSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sintomas: {
    type: String,
  },
  alergias: {
    type: String,
  },
  cita: {
    type: Schema.Types.ObjectId,
    ref: "Cita",
  },
});

module.exports = mongoose.model("Sintomas", SymptomSchema);
