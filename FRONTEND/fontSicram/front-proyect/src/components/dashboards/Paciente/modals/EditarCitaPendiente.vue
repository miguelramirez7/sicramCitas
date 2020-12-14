<template>
  <v-dialog :value="edit" max-width="800px" persistent>
    <v-card>
      <v-toolbar color="teal" dark class="pa-0">
        <v-toolbar-title v-html="'EDITAR CITA'"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <EditarHorarioPacienteDoc
        @recargarHorario="changeHorariosDoctor"
        @recargarCalendario ="recargaCalendar"
        class="pa-5"
        v-if="cita.doctor._id != null"
        :dataTime="listaHorarios"
        refs="childComponent2"
        :dataCita="cita"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import EditarHorarioPacienteDoc from "./EditarHorarioPacienteDoc";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditarCitaPendiente",
  components: {
    EditarHorarioPacienteDoc,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    cita: {
      type: Object,
      default: {
        doctor: {
          name: "Nombre",
          lastname: "Apellido",
        },
      },
    },
  },
  data() {
    return {
      newCita: {
        tipoPaciente: "",
        dependiente: "",
        especialidad: "",
        doctor: {
          name: "Nombre",
          lastname: "Apellido",
        },
      },
      listaHorarios: [],
    };
  },
  computed: {
    ...mapGetters(["getHorariosDesocupados"]),
    edit() {
      return this.dialog;
    },
  },
  methods: {
    ...mapActions(["listarHorariosDoctor"]),
    //CIERRA EL MODAL
    close() {
      this.$emit("close");
    },

    //CAMBIA A UNA LISTA DE LOS HORARIOS DEL DOCTOR
    changeHorariosDoctor() {
      if (this.cita.doctor._id != null) {
        console.log("asdasd", this.cita.doctor._id);
        this.listaHorarios = null;
        this.listarHorariosDoctor({ id: this.cita.doctor._id }).then((res) => {
          this.listaHorarios = this.getHorariosDesocupados;
          if (this.listaHorarios === null) {
            this.alerta.mensajeAlerta =
              "El doctor ya no cuenta con horarios disponibles.";
            this.alerta.tipoAlerta = "warning";
            this.showAlert = true;
          }
          console.log("ACTIVAR HORARIOS DOCTOR");
          this.$refs.childComponent2.updateRange
        });
      }
    },
    recargaCalendar(){
      this.$emit("recargaCalendar")
    }
  },
  watch: {
    cita: {
      handler: function(val, oldVal) {
        //this.userType();
        this.changeHorariosDoctor(); // call it in the context of your component object
      },
    },
  },
};
</script>

<style></style>
