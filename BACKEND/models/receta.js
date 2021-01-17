<<<<<<< HEAD
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecetaSchema = new Schema({
   
    dni:{
        type:String,
    },
    nombres_apellidos:{
        type:String
    },
    acto_medico:{
        type:String
    },
    medicamentos:[{
        medicamento:{
            type: String,
        },
        concentracion:{
            type: String,
        },  
        dosis_frecuencia:{
            type: String,
        },
        duracion:{
            type: String,
        },
        cantidad:{
            type: String,
        }
    }],
    fecha_expedicion:{
        type: String,
    },
    valida_hasta:{
        type: String,
    },
    cita:{
        type: Schema.Types.ObjectId,
        ref: 'Cita'
    },
    firma:{
        type:String
    }
});

module.exports = mongoose.model('Receta',RecetaSchema);
=======
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
>>>>>>> 700812119c72db65e755dab9b59bac781bfd14d5
