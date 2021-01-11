<template>
  <v-dialog :value="modSintomas" max-width="600px" persistent>
    <loader :dialog="showLoader" />
    <v-card>
      <v-toolbar color="teal" dark class="pa-0" max-height="60px">
        <v-btn
          color="teal accent-4"
          style="color:white;"
          @click="ingresarCita()"
        >
          Ingresar
          <v-icon>mdi-import</v-icon>
        </v-btn>
        <v-toolbar-title class="ml-5">REGISTRE SINTOMAS</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container pa-1 style="color:#333333;">
          <v-row>
            <v-col md="12" sm="12">
              Describa con el mayor detalle posible sus sintomas o molestias
              actuales:
            </v-col>
            <v-col md="12" sm="12">
              <v-textarea v-model="form.sintomas" color="teal" filled rows="1" no-resize></v-textarea>
            </v-col>

            <v-col md="6" sm="6">
              <v-row>
                <v-col sm="12">
                  ¿Ha tenido atención médica en esta plataforma en las últimas
                  24 horas?
                </v-col>
                <v-col cols="12">
                  <v-switch
                    v-model="form.last_atention"
                    :label="
                      form.last_atention
                        ? 'Sí, he recibido atención médico'
                        : 'No en las últimas 24 horas'
                    "
                  ></v-switch>
                </v-col>
              </v-row>
            </v-col>

            <v-col md="6" sm="12">
              <v-row>
                <v-col cols="12">
                  ¿Sufre de alguna alergía?
                </v-col>
                <v-col sm="12">
                  <v-switch
                    v-model="form.some_allergy"
                    :label="
                      form.some_allergy
                        ? 'Sí, sufro de alguna alergía'
                        : 'No poseo alergías'
                    "
                  ></v-switch>
                </v-col>
              </v-row>
            </v-col>

            <v-col md="12" sm="12">
              Digite su(s) alergia(s):
            </v-col>
            <v-col md="12" sm="12">
              <v-textarea
                color="teal"
                filled
                v-model="form.alergias"
                rows="1"
                no-resize
                name="input-7-4"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import Loader from "@/modals/Loader.vue";

const axios = require("axios");
//BASE URL POR DEFAULT EN LOCAL HOST
axios.defaults.baseURL = "http://localhost:3000/api";

const defaultForm = {
  sintomas: "",
  last_atention: false,
  some_allergy: true,
  alergias: "",
};

export default {
  components: { Loader },
  name: "RegistrarSintomas",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    idDoctor: {
      type: String,
      required: false,
    },
    idCita: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      showLoader: false,
      form: { ...defaultForm },
    };
  },
  computed: {
    modSintomas() {
      return this.dialog;
    },
  },
  watch: {
    // SI SE ABRE SE BUSCARÁ SI POSEE YA SINTOMAS REGISTRADOS
    dialog(val) {
      if (!!val) {
        this.searchSintomas(this.idCita);
      }
    },
  },
  methods: {
    ...mapActions(["save_idCita"]),
    close() {
      this.$emit("close");
    },
    searchSintomas(idCita) {
      axios.get(`/doctor/obtener-sintoma/${idCita}`).then((res) => {
        if (res.data.sintomaBuscado) {
          this.form = {
            sintomas: res.data.sintomaBuscado.sintomas,
            last_atention: res.data.sintomaBuscado.last_atention,
            some_allergy: res.data.sintomaBuscado.some_allergy,
            alergias: res.data.sintomaBuscado.alergias,
          };
        }
      });
    },
    ingresarCita() {
      this.showLoader = true;
      setTimeout(() => {
        this.showLoader = false;
        this.save_idCita(this.idCita);
        this.form.fecha = new Date()
        axios.post(`/doctor/generar-sintomas/${this.idCita}`, this.form).then((res) => {
          this.$router.push({
            name: "CitaPaciente",
            params: { id: this.idDoctor },
          });
        });
      }, 500);
    },
  },
};
</script>

<style scoped>
.colorLetra {
  color: #000000;
}
</style>
