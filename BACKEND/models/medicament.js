var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MedicineSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  concentracion: {
    type: String,
    required: true,
  },
  frecuencia: {
    type: String,
    required: true,
  },
  duracion: {
    type: String,
    required: true,
  },
  cantidad: {
    type: String,
    required: true,
  },
});

module.exports= mongoose.model("Medicamento", MedicineSchema)