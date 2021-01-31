<template>
  <v-dialog :value="modalInforme" persistent max-width="700px">
    <v-card v-if="data !== null">
      <v-card-title>
        INFORME MÉDICO
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
          <v-col sm="8" md="8"> : {{ data.fecha }} </v-col>
          <v-col sm="4" md="4">
            DOCTOR
          </v-col>
          <v-col sm="8" md="8">
            : {{ data.nombreDoc }} {{ data.apellidoDoc }}
          </v-col>
          <v-col sm="4" md="4">
            Especialidad
          </v-col>
          <v-col sm="8" md="8"> : {{ data.especialidad }} </v-col>
          <v-col sm="4" md="4">
            PACIENTE
          </v-col>
          <v-col sm="8" md="8">
            : {{ data.nombrePac }} {{ data.apellidoPac }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text style="color:black">
        <v-row no-gutters class="ma-2">
          <v-col md="3" sm="3">
            ANAMNESIS:
          </v-col>
          <v-col md="9" sm="9">
            <v-textarea
              v-model="data.anamnesis"
              dense
              rows="1"
              outlined
              no-resize
              color="teal"
            ></v-textarea>
          </v-col>
          <v-col md="3" sm="3">
            TRATAMIENTO:
          </v-col>
          <v-col md="9" sm="9">
            <v-textarea
              v-model="data.tratamiento"
              dense
              no-resize
              rows="1"
              outlined
              color="teal"
            ></v-textarea>
          </v-col>
          <v-col md="3" sm="3">
            DIAGNÓSTICO:
          </v-col>
          <v-col md="9" sm="9">
            <v-textarea
              v-model="data.diagnostico"
              dense
              no-resize
              rows="1"
              outlined
              color="teal"
            ></v-textarea>
          </v-col>
          <v-col md="3" sm="3">
            ÚLTIMA EVOLUCIÓN:
          </v-col>
          <v-col md="9" sm="9">
            <v-textarea
              v-model="data.ultima_evolucion"
              dense
              rows="1"
              no-resize
              outlined
              color="teal"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-if="data == null" >
      <v-card-title>
        INFORME MÉDICO
        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          No se expedió un informe para esta cita.
        </v-alert>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Informe",
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
        nombreDoc: "NOMBRE DOCTOR",
        apellidoDoc: "APELLIDO DOCTOR",
        nombrePac: "NOMBRE PACIENTE",
        apellidoPac: "APELLIDO PACIENTE",
        especialidad: "PRUEBA",
        fecha: "2020-20-20",
        anamnesis: "asdasd",
        tratamiento: "ASDasdasdasd",
        diagnostico: "aasdasdasd",
        ultima_evolucion: "asdñasdjklñasdjklasd",
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
    modalInforme() {
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
