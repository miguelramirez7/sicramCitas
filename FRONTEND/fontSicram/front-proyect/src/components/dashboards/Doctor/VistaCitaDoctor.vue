<template>
  <div>
    <!--QUESTIONER-->
    <questioner
      :dialog="showQuestion"
      @close="showQuestion = false"
      @accept="colgar"
      :title="'FINALIZAR VIDEOLLAMADA'"
      :message="
        'Una vez finalizada la llamada se contará como atendida, ¿Desea finalizarla?'
      "
    />
    <!--MODALES-->
    <nueva-receta
      :dialog="modalReceta"
      :data="dataReceta"
      @close="modalReceta = false"
    />
    <historial-paciente
      :dialog="modalHistorial"
      @close="modalHistorial = false"
    />
    <nuevo-informe
      :data="dataInforme"
      :dialog="modalInforme"
      @close="modalInforme = false"
    />
    <sintomas
      :dialog="modalSintomas"
      @close="modalSintomas = false"
      :data="dataSintomas"
    />
    <!----------->
    <v-row>
      <v-col :md="screen === true ? 12 : 9" sm="12" class="xs-12">
        <v-card
          height="83vh"
          class="blue-grey darken-4"
          width="100%"
          min-width="300px"
        >
          <session :vista="'doctor'" @click="abrrirModal" />
        </v-card>
      </v-col>
      <v-col :md="screen === true ? 12 : 3" sm="12" class="xs-12" width="100vh">
        <v-card height="83vh" color="teal lighten-1" width="100%">
          <v-card-text
            :style="mostrarChat != true ? 'display: none;' : ''"
            class="text-center"
          >
            <chat
              :data="{
                userOutgoing: getDoctorPerfil._id,
                userIncoming: idPaciente,
                userOutgoingFoto: 'mdi-doctor',
                sesionChat: get_idCita,
              }"
            />
          </v-card-text>
          <v-card-text
            :style="mostrarChat === true ? 'display: none;' : ''"
            class="text-center"
          >
            <v-btn
              color="white"
              @click="mostrarChat = !mostrarChat"
              block
              x-large
            >
              <v-icon color="teal" left> {{ iconMessage }} </v-icon>Abrir Chat
              <v-icon color="teal" right> mdi-send </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text class="text-center">
            <v-card color="rgba(0, 128, 128, 0.3)">
              <v-card-text>
                <v-btn
                  color="white"
                  fab
                  dark
                  elevation="10"
                  @click="mostrarChat = !mostrarChat"
                >
                  <v-icon color="teal">
                    {{ iconMessage }}
                  </v-icon>
                </v-btn>
                <v-btn
                  color="white"
                  fab
                  dark
                  elevation="10"
                  class="ml-3 mr-3"
                  @click="showQuestion = true"
                >
                  <v-icon color="red">
                    mdi-phone-off
                  </v-icon>
                </v-btn>
                <v-btn
                  color="white"
                  fab
                  dark
                  elevation="10"
                  @click="screen = !screen"
                >
                  <v-icon color="blue">
                    {{ iconScreen }}
                  </v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Questioner from "@/modals/Questioner.vue";
import Chat from "../Chat.vue";
import Session from "../Session.vue";
import HistorialPaciente from "./modals/HistorialPaciente.vue";
import NuevaReceta from "./modals/NuevaReceta.vue";
import NuevoInforme from "./modals/NuevoInforme.vue";
import Sintomas from "./modals/Sintomas.vue";

const axios = require("axios");
//BASE URL POR DEFAULT EN LOCAL HOST
axios.defaults.baseURL = "http://localhost:3000/api";
export default {
  name: "VistaCitaDoctor",
  components: {
    Session,
    Chat,
    NuevaReceta,
    HistorialPaciente,
    NuevoInforme,
    Sintomas,
    Questioner,
  },
  data() {
    return {
      idPaciente: this.$route.params.id,
      mostrarChat: true,
      screen: false,
      modalReceta: false,
      modalInforme: false,
      modalHistorial: false,
      modalSintomas: false,
      showQuestion: false,
      dataSintomas: null,
      dataInforme: null,
      dataReceta: null,
    };
  },

  computed: {
    ...mapGetters(["getDoctorPerfil", "get_idCita"]),
    iconMessage() {
      if (this.mostrarChat === true) {
        return "mdi-message-text-lock ";
      } else {
        return "mdi-message-text ";
      }
    },
    iconScreen() {
      if (this.screen === true) {
        return "mdi-fullscreen-exit";
      } else {
        return "mdi-fullscreen ";
      }
    },
  },
  methods: {
    abrrirModal(e) {
      console.log("modasdasdal a abrir", e);
      switch (e) {
        case "informe":
          this.modalInforme = true;

          let result = axios
            .get(`/doctor/obtener-informe/${this.$route.params.id}`)
            .then((response) => {
              this.dataInforme = {
                nombre: response.data.usuarioBuscado
                  ? response.data.usuarioBuscado.name.toUpperCase()
                  : "",
                apellido: response.data.usuarioBuscado
                  ? response.data.usuarioBuscado.lastname.toUpperCase()
                  : "",
                especialidad: response.data.especialidadBuscada
                  ? response.data.especialidadBuscada.especialidad.toUpperCase()
                  : "",
                fecha: "11 Dic 2020",
                anamnesis: response.data.informeBuscado
                  ? response.data.informeBuscado.anamnesis
                  : "",
                diagnostico: response.data.informeBuscado
                  ? response.data.informeBuscado.diagnostico
                  : "",
                tratamiento: response.data.informeBuscado
                  ? response.data.informeBuscado.tratamiento
                  : "",
                ultimaEvolucion: response.data.informeBuscado
                  ? response.data.informeBuscado.ultimaEvolucion
                  : "",
              };
            });

          break;
        case "sintomas":
          this.modalSintomas = true;

          result = axios
            .get(`/doctor/obtener-sintoma/${this.$route.params.id}`)
            .then((response) => {
              console.log(response);
              this.dataSintomas = {
                nombre: response.data.usuarioBuscado
                  ? response.data.usuarioBuscado.name.toUpperCase()
                  : "",
                apellido: response.data.usuarioBuscado
                  ? response.data.usuarioBuscado.lastname.toUpperCase()
                  : "",
                especialidad: response.data.especialidadBuscada
                  ? response.data.especialidadBuscada.especialidad.toUpperCase()
                  : "",
                fecha: "11 Dic 2020",
                sintomas: response.data.sintomaBuscado
                  ? response.data.sintomaBuscado.sintomas
                  : "",
                alergias: response.data.sintomaBuscado
                  ? response.data.sintomaBuscado.alergias
                  : "",
                last_atention: response.data.sintomaBuscado
                  ? response.data.sintomaBuscado.last_atention
                  : false,
                some_allergy: response.data.sintomaBuscado
                  ? response.data.sintomaBuscado.some_allergy
                  : false,
              };
            });

          break;
        case "historial":
          this.modalHistorial = true;
          break;
        case "receta":
          this.modalReceta = true;

          result = axios
            .get(`/doctor/obtener-receta/${this.$route.params.id}`)
            .then((response) => {
              console.log(response);
              this.dataReceta = {
                nombre: response.data.usuarioBuscado
                  ? response.data.usuarioBuscado.name.toUpperCase()
                  : "",
                apellido: response.data.usuarioBuscado
                  ? response.data.usuarioBuscado.lastname.toUpperCase()
                  : "",
                medicamentos:
                  response.data.recetaBuscada &&
                  response.data.recetaBuscada.medicamentos
                    ? response.data.recetaBuscada.medicamentos
                    : [],
                fecha: "11 Dic 2020",
                fechaExpedicion:
                  response.data.recetaBuscada &&
                  response.data.recetaBuscada.fechaExpedicion
                    ? response.data.recetaBuscada.fechaExpedicion.substring(
                        0,
                        10
                      )
                    : null,
                fechaVencimiento:
                  response.data.recetaBuscada &&
                  response.data.recetaBuscada.fechaVencimiento
                    ? response.data.recetaBuscada.fechaVencimiento.substring(
                        0,
                        10
                      )
                    : null,
                firma:
                  response.data.recetaBuscada &&
                  response.data.recetaBuscada.firma,
              };

              if (
                response.data.recetaBuscada &&
                response.data.recetaBuscada.firma
              ) {
                let firmaEntero = axios
                  .get(`/uploads/${response.data.recetaBuscada.firma}`)
                  .then((imagen) => {
                    this.dataReceta = {
                      ...this.dataReceta,
                      firmaEntera: imagen,
                    };
                  });
              }
            });
          break;
      }
    },

    colgar() {
      this.showQuestion = false;
      window.location.assign("/doctorsystem");
    },
  },
};
</script>

<style lang="scss" scoped></style>
