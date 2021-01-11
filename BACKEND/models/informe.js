var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var InformSchema = new Schema({
  anamnesis: {
    type: String,
  },
  tratamiento: {
    type: String,
  },
  diagnostico: {
    type: String,
  },
  ultimaEvolucion: {
    type: String,
  },
  cita: {
    type: Schema.Types.ObjectId,
    ref: "Cita",
  },
});

module.exports = mongoose.model("Informe", InformSchema);
