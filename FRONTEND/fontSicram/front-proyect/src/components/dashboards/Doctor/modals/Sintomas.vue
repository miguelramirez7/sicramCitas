<template>
  <v-dialog :value="modalSintomas" persistent max-width="700px">
    <v-card v-if="data!==null">
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
      </v-card-text>
      <v-card-text style="color:black">
          <v-row no-gutters class="ma-2">
            <v-col md="3" sm="3">
              Sintomas:
            </v-col>
            <v-col md="9" sm="9">
              <v-textarea
                v-model="data.sintomas"
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
                v-model="data.alergias"
                dense
                no-resize
                rows="1"
                outlined
                color="teal"
              ></v-textarea>
            </v-col>
          </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Sintomas",
  props: {
    dialog: {
      type: Boolean,
      default: false,
      required: false
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
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>