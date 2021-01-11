<template>
  <v-dialog :value="modalSintomas" persistent max-width="700px">
    <v-card v-if="data !== null">
      <v-card-title>
        SINTOMAS DEL PACIENTE
        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text style="color:black;">
        <v-row no-gutters class=" mb-4">
          <v-col sm="4" md="4">
            Fecha
          </v-col>
          <v-col sm="8" md="8"> : {{ infoSintoma.fecha }} </v-col>
          <v-col sm="4" md="4">
            DOCTOR
          </v-col>
          <v-col sm="8" md="8">
            : {{ infoSintoma.nombre }} {{ infoSintoma.apellido }}
          </v-col>
          <v-col sm="4" md="4">
            Especialidad
          </v-col>
          <v-col sm="8" md="8"> : {{ infoSintoma.especialidad }} </v-col>
        </v-row>
      </v-card-text>
      <v-card-text style="color:black">
        <v-row no-gutters class="ma-2">
          <v-col md="3" sm="3">
            Sintomas:
          </v-col>
          <v-col md="9" sm="9">
            <v-textarea
              v-model="infoSintoma.sintomas"
              dense
              rows="3"
              outlined
              no-resize
              color="teal"
            ></v-textarea>
          </v-col>
          <v-col md="3" sm="3">
            Alergias:
          </v-col>
          <v-col md="9" sm="9">
            <v-textarea
              v-model="infoSintoma.alergias"
              dense
              no-resize
              rows="1"
              outlined
              color="teal"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-row no-gutters class="ma-2">
          <v-col md="12">
            <v-spacer></v-spacer>
            <v-btn
              @click="saveSymptom"
              dark
              class="right"
              color="teal darken-2"
            >
              Guardar Sintoma
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
const axios = require("axios");
//BASE URL POR DEFAULT EN LOCAL HOST
axios.defaults.baseURL = "http://localhost:3000/api";
export default {
  name: "Sintomas",
  props: {
    dialog: {
      type: Boolean,
      default: false,
      required: false,
    },
    data: {
      type: Object,
      required: false,
      default: {
        nombre: "NOMBRE DOCTOR",
        apellido: "APELLIDO DOCTOR",
        fecha: "2020-20-20",
        sintomas: "asdasd",
        alergias: "Ninguna",
      },
    },
  },
  data() {
    return {
      infoSintoma: {
        nombre: "",
        apellido: "",
        fecha: "",
        sintomas: "",
        alergias: "",
        especialidad: ""
      },
      headers: [
        { text: "Medicamento", value: "medicamento" },
        { text: "Concentración", value: "concentración" },
        { text: "Frecuencia", value: "frecuencia" },
        { text: "Duración", value: "duración" },
        { text: "Cantidad", value: "cantidad" },
      ],
    };
  },
  computed: {
    modalSintomas() {
      return this.dialog;
    },
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.infoSintoma = val;
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    saveSymptom() {
      this.infoSintoma.fecha = new Date();
      axios
        .post(
          `/doctor/generar-sintomas/${this.$route.params.id}`,
          this.infoSintoma
        )
        .then((response) => {
          console.log("Fue generado");
          this.close();
        });
    },
  },
};
</script>

<style></style>
