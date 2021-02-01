<template>
  <v-dialog :value="modalReceta" persistent max-width="700px">
    <v-card v-if="data!==null">
      <v-card-title> 
        RECETA MÉDICA
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
          <v-col sm="8" md="8">
            : {{data.fecha}}
          </v-col>
          <v-col sm="4" md="4">
            DOCTOR
          </v-col>  
          <v-col sm="8" md="8">
            : {{data.nombreDoc}} {{data.apellidoDoc}}
          </v-col>
          <v-col sm="4" md="4">
            Especialidad
          </v-col>
          <v-col sm="8" md="8">
            : {{data.especialidad}}
          </v-col>
          <v-col sm="4" md="4">
            PACIENTE
          </v-col>
          <v-col sm="8" md="8">
            : {{data.nombrePac}} {{data.apellidoPac}}
          </v-col>
          
        </v-row>
        <v-data-table
          :items="data.medicamentos"
          :headers="headers"
          sort-by="calories"
          class="elevation-1"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-card v-if="data == null">
      <v-card-title>
        RECETA MÉDICA
        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          El doctor no expidió una receta en esta cita.
        </v-alert>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Receta",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: {
        nombreDoc: "NOMBRE DOCTOR",
        apellidoDoc: "APELLIDO DOCTOR",
        nombrePac : "NOMBRE PACIENTE",
        apellidoPac: "APELLIDO PACIENTE",
        fecha: "2020-20-20",
        especialidad: "PRUEBA",
        medicamentos: [
          {
            medicamento: "pastilla",
            concentracion: "conc",
            dosis_frecuencia: "frec",
            duracion: "dur",
            cantidad: "ctd",
          },
        ],
      },
    },
  },
  data() {
    return {
      headers: [
        { text: "Medicamento", value: "medicamento" },
        { text: "Concentración", value: "concentracion" },
        { text: "Frecuencia", value: "dosis_frecuencia" },
        { text: "Duración", value: "duracion" },
        { text: "Cantidad", value: "cantidad" },
      ],
    };
  },
  computed: {
    modalReceta() {
      return this.dialog;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
