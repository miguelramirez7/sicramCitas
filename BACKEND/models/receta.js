var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  medicamentos: [
    {
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
    }
  ],
  fechaExpedicion: {
    type: Date,
    required: true,
  },
  fechaVencimiento: {
    type: Date,
    required: true,
  },
  firma: {
    type: String
  },
  cita : {
    type: Schema.Types.ObjectId,
    ref: "Cita",
  }
});

module.exports = mongoose.model("Receta", RecipeSchema);
