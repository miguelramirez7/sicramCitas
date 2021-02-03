<template>
  <v-dialog max-width="800px" :value="modHistorial" persistent>
    <!--RECETA MÉDICA--->
    <receta
      :dialog="showReceta"
      @close="showReceta = false"
      :data="dataReceta"
    />
    <!--INFORME MÉDICO-->
    <informe
      :dialog="showInforme"
      @close="showInforme = false"
      :data="dataInforme"
    />
    <!--SINTOMAS PACIENTE-->
    <sintomas
      :dialog="showSintomas"
      @close="showSintomas = false"
      :data="dataSintomas"
    />
    <v-card>
      <v-toolbar color="teal" dark class="pa-0">
        <v-toolbar-title v-html="'HiSTORIAL DEL PACIENTE'"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="mt-5" v-if="histPaciente== null">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          El paciente no cuenta con un Historial médico.
        </v-alert>
      </v-card-text>
      <v-card-text class="mt-5 caja-historial"  v-if="histPaciente != null">
        <v-data-table
          :items="histPaciente" 
          :headers="headers"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title
                >Paciente: Luis Enrique Medina Castillo</v-toolbar-title
              >
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  @click="abrirReceta(item)"
                  color="green"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-note-plus
                </v-icon>
              </template>
              <span>Receta médica</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="ml-2"
                  @click="abrirInforme(item)"
                  color="blue"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-clipboard-text
                </v-icon>
              </template>
              <span>Informe médico</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="ml-2"
                  @click="abrirSintomas(item)"
                  color="orange darken-4"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-clipboard-account-outline
                </v-icon>
              </template>
              <span>Receta médica</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Informe from "./Informe.vue";
import Receta from "./Receta.vue";
import Sintomas from "./Sintomas.vue";

export default {
  components: { Receta, Informe, Sintomas },
  name: "HistorialPaciente",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSintomas: false,
      showReceta: false,
      showInforme: false,
      dataSintomas: null,
      dataInforme: null,
      dataReceta: null,
      headers: [
        { text: "Fecha", value: "horario.fecha" },
        { text: "NombreDoctor", value: "doctor.name" },
        { text: "ApellidoDoctor", value: "doctor.lastname" },
        { text: "Especialidad", value: "especialidad.especialidad" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [
        {
          fecha: "2020-20-20",
          nombre: "GRETA MURIEL",
          apellido: "ZAVALETA DEXTRE",
          especialidad: "Fisioterapia",
        },
        {
          fecha: "2020-21-20",
          nombre: "GRETA MURIEL",
          apellido: "ZAVALETA DEXTRE",
          especialidad: "Terapia",
        },
        {
          fecha: "2020-22-20",
          nombre: "GRETA MURIEL",
          apellido: "ZAVALETA DEXTRE",
          especialidad: "Fisioterapia",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["get_idCita", "getUsuario", "getHistorialPaciente"]),
    modHistorial() {
      return this.dialog;
    },
    histPaciente() {
      if (this.getHistorialPaciente == null) return null;
      else return this.getHistorialPaciente;
    },
  },
  methods: {
    ...mapActions(["historialDelPaciente"]),
    close() {
      this.$emit("close");
    },

    obtenerHistorial() {
      const datos = {
        doctor: this.getUsuario,
        id_cita: this.get_idCita,
      };
      this.historialDelPaciente(datos);
    },

    abrirReceta(e) {
      if (e.receta == undefined) this.dataReceta = null;
      else
        this.dataReceta = {
          nombreDoc: e.doctor.name,
          apellidoDoc: e.doctor.lastname,
          nombrePac: e.user.name,
          apellidoPac: e.user.lastname,
          fecha: e.horario.fecha,
          medicamentos: e.receta.medicamentos,
          especialidad: e.especialidad.especialidad,
        };
      this.showReceta = true;
    },
    abrirInforme(e) {
      if(e.diagnostico == undefined) this.dataInforme = null
      else
      this.dataInforme = {
        nombreDoc: e.doctor.name,
        apellidoDoc: e.doctor.lastname,
        nombrePac: e.user.name,
        apellidoPac: e.user.lastname,
        fecha: e.horario.fecha,
        especialidad: e.especialidad.especialidad,
        anamnesis: "ESTE PACIENTE LLEGO CON",
        tratamiento: e.diagnostico.tratamiento,
        diagnostico: e.diagnostico.diagnostico,
        ultima_evolucion: e.diagnostico.resultados_labo,
      };
      
      this.showInforme = true
    },
    abrirSintomas(e) {
      if (e.detalle_sintomas.sintoma == null) this.dataSintomas = null;
      else
        this.dataSintomas = {
          nombreDoc: e.doctor.name,
          apellidoDoc: e.doctor.lastname,
          nombrePac: e.user.name,
          apellidoPac: e.user.lastname,
          fecha: e.horario.fecha,
          especialidad: e.especialidad.especialidad,
          sintomas: e.detalle_sintomas.sintoma,
          alergias: "NINGUNA",
        };
      this.showSintomas = true;
    },
  },
  created() {
    this.obtenerHistorial();
  },
};
</script>

<style lang="scss" scoped>

  .caja-historial {
  max-height: 70vh;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar:vertical {
    width: 8px;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a7a5a5;
    border-radius: 20px;
    border: 1px solid #f1f2f3;
  }
  &::-webkit-scrollbar-button:increment,
  .contenedor::-webkit-scrollbar-button {
    display: none;
  }
  .enviarMensaje {
    bottom: 15px;
    position: absolute;
    width: 87%;
  }
}
</style>

