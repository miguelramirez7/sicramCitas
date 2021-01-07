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
            : {{data.nombre}} {{data.apellido}}
          </v-col>
          <v-col sm="4" md="4">
            Especialidad
          </v-col>
          <v-col sm="8" md="8">
            : {{data.especialidad}}
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
        nombre: "NOMBRE DOCTOR",
        apellido: "APELLIDO DOCTOR",
        fecha: "2020-20-20",
        medicamentos: [
          {
            medicamento: "pastilla",
            concentración: "conc",
            frecuencia: "frec",
            duración: "dur",
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
        { text: "Concentración", value: "concentración" },
        { text: "Frecuencia", value: "frecuencia" },
        { text: "Duración", value: "duración" },
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
