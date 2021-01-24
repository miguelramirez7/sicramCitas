<template>
  <v-dialog :value="loginDialog" max-width="600px" persistent content-class="modal-ingreso">
    <!----CARGADOR---->
    <Loader :dialog="showLoader" />
    <!----ALERTA---->
    <Alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="'Usuario o contraseña incorrectos!'"
      :tipo="'error'"
    />
    <v-row no-gutters >
      <v-col cols="12" md="6">
        <v-img
          src="../assets/doctor-patient.jpg"
          height="100%"
          background="red"
        >
        </v-img>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="rounded-0">
          <v-form ref="form" lazy-validation @submit.prevent="login">
            <v-card-title class="d-flex justify-center">
              <span class="headline">INICIO DE SESIÓN</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Correo*"
                      :rules="[getReglas.requerido, getReglas.correo]"
                      required
                      v-model="usuario.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      label="Contraseña*"
                      :rules="[getReglas.requerido]"
                      :type="show1 ? 'text' : 'password'"
                      required
                      @click:append="show1 = !show1"
                      v-model="usuario.password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="pink darken-1" text @click="close()">
                Cerrar
              </v-btn>
              <v-btn color="blue darken-1" text type="submit">
                Ingresar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
      
    </v-row>
  </v-dialog>
</template>

<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Login",
  components: {
    Loader,
    Alert,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
      showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
      show1: false, //MOSTRAR CONTRASEÑA
      usuario: {
        //DATOS DEL USUARIO PARA INICIAR SESION
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getReglas"]),
    loginDialog() {
      return this.dialog;
    },
  },
  methods: {
    ...mapActions(["loginPaciente", "loginDoctor", "loginOrganizacion"]),
    //CIERRA EL MODAL
    close() {
      this.$emit("close");
    },
    //INICIANDO SESION USUARIO
    login() {
      console.log(this.usuario);
      //PREGUNTA A LA VALIDACÓN SI TODO HA SIDO LLENADO CORRECTAMENTE
      if (this.$refs.form.validate()) {
        //INCIAR SESION COMO PACIENTE
        this.showLoader = true;
        this.loginPaciente(this.usuario).then((res) => {
          if (res) {
            this.$router.push("/pacientesystem");
          } else {
            //INICIAR SESION COMO DOCTOR
            this.loginDoctor(this.usuario).then((res) => {
              if (res) {
                this.$router.push("/doctorsystem");
              } else {
                console.log("usuarios incorrecots");
                this.showLoader = false;
                this.showAlert = true;
                //INICIAR SESION COMO ORGANIZACION
                /*this.loginOrganizacion(this.usuario).then((res) => {
                if (res) {
                  this.$router.push("/organizacionvista");
                } else {
                  console.lo("usuarios incorrecots")
                }
              });*/
              }
            });
          }
        });
      } else {
        //MENSAJE DE AYUDA
        console.log("MOSTRAR MENSAJE NEGATIVO");
      }
    },
  },
};
</script>

<style scoped>

@import '../assets/css/home.css';

</style>