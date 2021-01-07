<template>
  <div>
    <!--QUESTIONER-->
    <questioner
      :dialog="showQuestion"
      @close="showQuestion = false"
      @accept="colgar"
      :title="'FINALIZAR VIDEOLLAMADA'"
      :message="
        '¿Desea finalizarla la videollamada?'
      "
    />
    <v-row class="pl-0 pr-0">
      <v-col :md="screen === true ? 12 : 9" sm="12" class="xs-12">
        <v-card
          height="83vh"
          class="blue-grey darken-4"
          width="100%"
          min-width="300px"
        >
          <session :vista="'paciente'"/>
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
                userOutgoing: getPacientePerfil._id,
                userIncoming: idDoctor,
                userOutgoingFoto: 'mdi-account',
                sesionChat: get_idCita
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
              <v-icon color="teal" left>
                {{ iconMessage }} </v-icon
              >Abrir Chat
              <v-icon color="teal" right>
                mdi-send </v-icon
              >
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
                <v-btn color="white" fab dark elevation="10" class="ml-3 mr-3">
                  <v-icon color="red" @click="showQuestion = true">
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
    <div></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Questioner from "@/modals/Questioner.vue";
import Chat from "../Chat.vue";
import Session from "../Session.vue";
export default {
  name: "VistaCitaPaciente",
  components: { Session, Chat,Questioner },
  data() {
    return {
      screen: false,
      idDoctor: this.$route.params.id,
      mostrarChat: true,
      showQuestion: false,
    };
  },

  computed: {
    ...mapGetters(["getPacientePerfil","get_idCita"]),
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
  methods:{
     colgar() {
      this.showQuestion = false;
      window.location.assign("/pacientesystem");
    },
  }
};
</script>

<style lang="scss" scoped></style>
