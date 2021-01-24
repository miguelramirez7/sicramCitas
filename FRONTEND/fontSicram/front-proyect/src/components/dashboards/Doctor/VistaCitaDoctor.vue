<template>
  <div>
    <!----LOADER---->
    <loader :dialog="showLoader" />
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
import { mapActions, mapGetters } from "vuex";
import Questioner from "@/modals/Questioner.vue";
import Chat from "../Chat.vue";
import Session from "../Session.vue";
import HistorialPaciente from "./modals/HistorialPaciente.vue";
import NuevaReceta from "./modals/NuevaReceta.vue";
import NuevoInforme from "./modals/NuevoInforme.vue";
import Sintomas from "./modals/Sintomas.vue";
import Loader from "@/modals/Loader.vue";

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
    Loader,
  },
  data() {
    return {
      showLoader: false,
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
    ...mapGetters([
      "getDoctorPerfil",
      "get_idCita",
      "getUsuario",
      "getDataSintomasPaciente",
    ]),
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
    ...mapActions(["sintomasPaciente"]),
    abrrirModal(e) {
      console.log("modasdasdal a abrir", e);
      switch (e) {
        case "informe":
          this.modalInforme = true;
          this.dataInforme = {
            nombre: "NOMBRE DOCTOR",
            apellido: "APELLIDO DOCTOR",
            fecha: "2020-20-20",
          };

          break;
        case "sintomas":
          this.mostrarSintomas();
          break;
        case "historial":
          this.modalHistorial = true;
          break;
        case "receta":
          this.modalReceta = true;
          this.dataReceta = {
            nombre: "NOMBRE DOCTOR",
            apellido: "APELLIDO DOCTOR",
          }
         
          break;
      }
    },

    colgar() {
      this.showQuestion = false;
      window.location.assign("/doctorsystem");
    },

    mostrarSintomas() {
      //ABRIMOS EL CARGADOR
      this.showLoader = true;
      //SE PSAN LOS DATOS CORRESPONDIENTES PARA LA CONSULTA
      const datos = {
        doctor: this.getUsuario,
        id_cita: this.get_idCita,
      };
      //ABRIMOS LA CONSULTA PARA LOS SINTOMAS DEL PACIENTE
      this.sintomasPaciente(datos).then((res) => {
        this.showLoader = false;
        this.dataSintomas = {
          nombre: this.getDoctorPerfil.name,
          apellido: this.getDoctorPerfil.lastname,
          especialidad: this.getDoctorPerfil.especialidad.especialidad,
          fecha: this.getDataSintomasPaciente.horario,
          sintomas: this.getDataSintomasPaciente.detalle_sintomas.sintoma,
          alergias: this.getDataSintomasPaciente.detalle_sintomas.alergia,
        };
        this.modalSintomas = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
