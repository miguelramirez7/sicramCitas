var cron = require("node-cron");
var Horario = require("../models/horario");
var Doctor = require("../models/doctor");
const n = new Date();
//Año
var y = n.getFullYear();
//Mes
var m = n.getMonth() + 1;
//Día
var d = n.getDate();
const fechaActual = new Date(y, m, d);
// Este evento borra todos los horarios pasados, se verifica siempre al finalizar el día
//fecha: { $lt: fechaActual }
cron.schedule("5 0 0 * * *", async () => {
  await Horario.find({ ocupado: false }, async (err, horarios) => {
    if (err) {
      console.log("ERROR" + err);
    }
    if (horarios) {
      await Doctor.find({ id: horarios.doctor }, (err, doctores) => {
        doctores.forEach((doctor) => {
          horarios.forEach((horario) => {
            var cy = horario.fecha.substring(0, 4);
            var cm = horario.fecha.substring(5, 7);
            var cd = horario.fecha.substring(8, 10);
            const fechadoctor = new Date(cy, cm, cd);
            if (fechaActual > fechadoctor) {
              var encontrado = doctor.horario.indexOf(horario.id);
              if (encontrado > -1) {
                doctor.horario.splice(encontrado, 1);
                horario.deleteOne();
              }
            }
          });
          doctor.save();
        });
      });
    }
  });
});
