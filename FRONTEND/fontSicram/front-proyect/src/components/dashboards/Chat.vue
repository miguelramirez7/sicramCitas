<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text ref="messageDisplay" class="cajaMensaje" id="container">
          <div
            :class="
              element.nombre === data.userOutgoing ? 'text-right' : 'text-left'
            "
            v-for="(element, index) in mensajes"
            :key="index"
          >
            <div
              :class="
                element.nombre === data.userOutgoing
                  ? 'mensaje-entrante'
                  : 'mensaje-saliente'
              "
            >
              <v-avatar height="5vh" width="5vh">
                <v-icon color="white" class="icono"> {{ element.foto }}</v-icon>
              </v-avatar>
              <span>{{ element.mensaje }}</span>
            </div>
            <p class="caption">{{ element.fecha }}</p>
          </div>
        </v-card-text>
        <v-card-text>
          <div class="enviarMensaje">
            <v-form ref="form" lazy-validation @submit.prevent="sendMessage">
              <v-text-field
                autocomplete="off"
                append-outer-icon="mdi-send"
                prepend-inner-icon="mdi-message-text"
                v-model="mensaje"
                @click:append-outer="sendMessage"
                label="Escriba su mensaje"
                color="teal"
              ></v-text-field>
            </v-form>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from "@/firebase/firebase";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "Chat",
  data() {
    return {
      mensaje: "",
      fecha: Date.now(),
      mensajes: [],
      count: 0,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: {
        userOutgoing: "",
        userIncoming: "",
        userOutgoingFoto: "",
        sesionChat: "",
      },
    },
  },
  methods: {
    async getMessages() {
      moment.locale("es");
      console.log(this.data.userOutgoing)
      console.log(this.data.sesionChat)
      let ref = db
        .collection("chatSicram")
        .doc(this.data.userOutgoing)
        .collection(this.data.sesionChat)
        .orderBy("fecha");
      ref.onSnapshot((qsh) => {
        this.mensajes = [];
        qsh.forEach((element) => {
          this.mensajes.push({
            mensaje: element.data().mensaje,
            nombre: element.data().nombre,
            fecha: moment(element.data().fecha).format("lll"),
            foto: element.data().foto,
          });

          var messageDisplay = this.$refs.messageDisplay;
          messageDisplay.scrollTop = messageDisplay.scrollHeight;
          this.count = this.count + 1;
        });
        console.log(qsh.docs.length, this.count);
      });
    },
    scrollToEnd: function() {
      var messageDisplay = this.$refs.messageDisplay;
      messageDisplay.scrollTop = messageDisplay.scrollHeight;
    },
    sendMessage() {
      if (this.mensaje !== "") {
        console.log(this.mensaje);
        db.collection("chatSicram")
          .doc(this.data.userOutgoing)
          .collection(this.data.sesionChat)
          .add({
            mensaje: this.mensaje,
            nombre: this.data.userOutgoing,
            fecha: Date.now(),
            foto: this.data.userOutgoingFoto,
          })
          .catch((error) => {
            console.log(error);
          });
        db.collection("chatSicram")
          .doc(this.data.userIncoming)
          .collection(this.data.sesionChat)
          .add({
            mensaje: this.mensaje,
            nombre: this.data.userOutgoing,
            fecha: Date.now(),
            foto: this.data.userOutgoingFoto,
          })
          .catch((error) => {
            console.log(error);
          });

        this.mensaje = "";
      } else {
        console.log("nada");
      }
    },
  },
  computed: {
    ...mapGetters(["getReglas"]),
  },
  updated() {
    // whenever data changes and the component re-renders, this is called.
    this.$nextTick(() => this.scrollToEnd());
  },
  created() {
    this.getMessages();
  },
};
</script>

<style lang="scss" scope>
.cajaMensaje {
  height: 40vh;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar:vertical {
    width: 8px;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a7a5a5;
    border-radius: 20px;
    border: 1px solid #f1f2f3;
  }
  &::-webkit-scrollbar-button:increment,
  .contenedor::-webkit-scrollbar-button {
    display: none;
  }
  .enviarMensaje {
    bottom: 15px;
    position: absolute;
    width: 87%;
  }
}

.mensaje-entrante {
  color: rgb(41, 41, 41);
  border-radius: 25px 25px 0px 25px;
  background: rgb(231, 231, 231);
  text-align: justify;
  margin: 5px 1px 0px 20px;
  padding: 10px;
  &:hover {
    background: rgb(226, 225, 225);
  }
  .icono {
    background: rgb(43, 117, 228);
  }
}

.mensaje-saliente {
  color: rgb(41, 41, 41);
  border-radius: 25px 25px 25px 0px;
  background: rgb(231, 231, 231);
  text-align: justify;
  margin: 5px 20px 0px 1px;
  padding: 10px;
  &:hover {
    background: rgb(226, 225, 225);
  }
  .icono {
    background: rgb(85, 192, 81);
  }
}
</style>
