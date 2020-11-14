<template>
  <v-dialog :value="regOrgDialog" max-width="600px" persistent>
    <!----CARGADOR---->
    <Loader :dialog="showLoader" />
    <!----ALERTA---->
    <Alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    />
    <v-card color="grey lighten-5">
      <v-form ref="form" lazy-validation @submit.prevent="registrar">
        <v-card-title>
          <span class="headline">REGISTRO DE ORGANIZACION</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Correo*"
                  :rules="[getReglas.correo, getReglas.requerido]"
                  required
                  color="blue"
                  v-model="organizacionDatos.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Contraseña*"
                  :rules="[
                    getReglas.requerido,
                    getReglas.pass,
                    getReglas.minimochar,
                  ]"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  required
                  color="blue"
                  @click:append="show1 = !show1"
                  v-model="organizacionDatos.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="Nombre organización*"
                  :rules="[getReglas.requerido]"
                  required
                  color="blue"
                  v-model="organizacionDatos.nameOrg"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Dirección"
                  required
                  color="blue"
                  v-model="organizacionDatos.direccion"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="R.U.C.*"
                  required
                  color="blue"
                  :rules="[getReglas.requerido]"
                  v-model="organizacionDatos.ruc"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Datos obligatorios a llenar.</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink darken-1" text @click="close()">
            Cerrar
          </v-btn>
          <v-btn color="blue darken-1" text type="submit">
            Registrar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RegistroOrganizacionMod",
  components:{
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
      organizacionDatos: {
        //DATOS PARA CREAR UNA ORGANIZACION
        email: "",
        password: "",
        nameOrg: "",
        direccion: "",
        ruc: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getReglas", "getAlert"]),
    regOrgDialog() {
      return this.dialog;
    },
  },
  methods: {
    ...mapActions(["registrarOrganizacion"]),
    //CIERRA EL MODAL
    close() {
      this.$emit("close");
    },
    //REGISTRAR A LA ORGANIZACION
    registrar() {
      //PREGUNTA A LA VALIDACÓN SI TODO HA SIDO LLENADO CORRECTAMENTE
      if (this.$refs.form.validate()) {
        //MUESTRA EL CARGADOR
        this.showLoader = true;
        console.log("ORGANIZACION :", this.organizacionDatos);
        //LLAMA A LA FUNCION REGISTRAR ORGANIZACION DE ORGANIZACION.JS
        this.registrarOrganizacion(this.organizacionDatos).then((res) => {
          //DESHABILITA EL LOADER Y MUESTRA LA ALERTA CON EL MENSAJE DE ALERTA DEL BACK
          this.showLoader = false;
          this.showAlert = true;
          if (res === true) this.$refs.form.reset(); //SI SE LOGRA INGRESAR CON EXITO TODO SE RESETEA EL FORMULARIO
        });
      } else {
        //MENSAJE DE AYUDA
        console.log("MOSTRAR MENSAJE NEGATIVO");
      }
    },
  },
};
</script>

<style></style>
