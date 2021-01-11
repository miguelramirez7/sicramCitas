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
      <v-card-text class="mt-5">
        <v-data-table
          :items="items"
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
import Informe from "./Informe.vue";
import Receta from "./Receta.vue";
import Sintomas from "./Sintomas.vue";

const axios = require("axios");
//BASE URL POR DEFAULT EN LOCAL HOST
axios.defaults.baseURL = "http://localhost:3000/api";

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
        { text: "Fecha", value: "fecha" },
        { text: "NombreDoctor", value: "nombre" },
        { text: "ApellidoDoctor", value: "apellido" },
        { text: "Especialidad", value: "especialidad" },
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
    modHistorial() {
      return this.dialog;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },

    abrirReceta(e) {
      (this.showReceta = true),
        (this.dataReceta = {
          nombre: e.nombre,
          apellido: e.apellido,
          fecha: e.fecha,
          especialidad: e.especialidad,
          medicamentos: [
            {
              medicamento: "pastilla",
              concentración: "conca",
              frecuencia: "frec",
              duración: "dur",
              cantidad: "ctd",
            },
            {
              medicamento: "pastilla",
              concentración: "conca",
              frecuencia: "frec",
              duración: "dur",
              cantidad: "ctd",
            },
          ],
        });
    },
    abrirInforme(e) {
      (this.showInforme = true),
        (this.dataInforme = {
          nombre: e.nombre,
          apellido: e.apellido,
          fecha: e.fecha,
          especialidad: e.especialidad,
          anamnesis:
            "asdasasdkapsdjasdasdasdjklklasdjklasdjkasdjkasdjklasdjklasdklklasdjklasdjklsdjklasdjkld",
          tratamiento: "puta la wea",
          diagnostico: "aasdasdasd12123",
          ultima_evolucion: "asdñasdjkl123123ñasdjklasd",
        });
    },
    abrirSintomas(e) {
      this.showSintomas = true;
      let result = axios
        .get(`/doctor/obtener-sintoma/${this.$route.params.id}`)
        .then((response) => {
          this.dataSintomas = {
            nombre: response.usuarioBuscado.name,
            apellido: response.usuarioBuscado.lastname,
            especialidad: response.especialidadBuscada.especialidad,
            fecha: e.fecha,
            sintomas: response.sintomaBuscado
              ? response.sintomaBuscado.sintomas
              : "",
            alergias: response.sintomaBuscado
              ? response.sintomaBuscado.alergias
              : "",
          };
        });
      // this.dataSintomas = {
      //   nombre: e.nombre,
      //   apellido: e.apellido,
      //   fecha: e.fecha,
      //   especialidad: e.especialidad,
      //   sintomas: "ME DUELE MUCHO LA PANZA LA PTM",
      //   alergias: "Ninguna",
      // }
    },
  },
};
</script>

<style></style>
