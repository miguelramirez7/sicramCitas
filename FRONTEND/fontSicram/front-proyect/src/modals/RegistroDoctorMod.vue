<template>
  <v-dialog :value="regDocDialog" max-width="600px" persistent>
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
          <span class="headline">REGISTRO DE DOCTOR</span>
        </v-card-title>
        <v-card-text class="pa-1">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="6" md="6" class="">
                <v-text-field
                  label="Nombres*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido,getReglas.maxCharacters]"
                  v-model="doctorDatos.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Apellidos*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido,getReglas.maxCharacters]"
                  v-model="doctorDatos.lastname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Correo*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido, getReglas.correo,getReglas.maxCharacters]"
                  v-model="doctorDatos.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Contraseña*"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  required
                  color="cyan"
                  :rules="[
                    getReglas.requerido,
                    getReglas.pass,
                    getReglas.minimochar,
                    getReglas.maxCharacters
                  ]"
                  @click:append="show1 = !show1"
                  v-model="doctorDatos.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                type="number"
                  label="DNI*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido, getReglas.DNI]"
                  v-model="doctorDatos.dni"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['MASCULINO', 'FEMENINO']"
                  label="Género*"
                  required
                  color="cyan"                  
                  :rules="[getReglas.requerido]"
                  v-model="doctorDatos.genero"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="CMP*"
                  required   
                  color="cyan"
                  :rules="[getReglas.requerido]"
                  v-model="doctorDatos.cmp"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="getEspecialidades"
                  item-text="especialidad"
                  label="Especialidad*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido]"
                  v-model="doctorDatos.especialidad"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Edad*"
                  type="number"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido,getReglas.edad]"
                  v-model="doctorDatos.edad"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Número de celular"
                  color="cyan"
                  type="number"
                  :rules="[
                    getReglas.requerido,
                    getReglas.numCelular,
                    getReglas.celular,
                  ]"
                  v-model="doctorDatos.celular"
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
  name: "RegistroDoctorMod",
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
      show1: false, //MOSTRAR CONTRASEÑA
      showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
      showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
      doctorDatos: {
        //DATOS DEL DOCTOR A REGISTRAR
        password: "",
        email: "",
        name: "",
        lastname: "",
        genero: "",
        dni: "",
        edad: "",
        celular: "",
        cmp: "",
        profesion: "DOCTOR",
        especialidad: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getReglas", "getAlert","getEspecialidades"]),
    regDocDialog() {
      return this.dialog;
    },
  },
  methods: {
    ...mapActions(["registrarDoctor"]),
    //CIERRA EL MODAL
    close() {
      this.$emit("close"); 
    },
    //REGISTRAR AL DOCTOR
    registrar() {
      //PREGUNTA A LA VALIDACÓN SI TODO HA SIDO LLENADO CORRECTAMENTE
      if (this.$refs.form.validate()) {
        //MUESTRA EL CARGADOR
        this.showLoader = true;
        console.log("DOCTOR :", this.doctorDatos);
        //LLAMA A LA FUNCION REGISTRAR DOCTOR DE DOCTOR.JS
        this.registrarDoctor(this.doctorDatos).then((res) => {
          //DESHABILITA EL LOADER Y MUESTRA LA ALERTA CON EL MENSAJE DE ALERTA DEL BACK
          this.showLoader = false;
          this.showAlert = true;
          if (res === true) {
            this.$refs.form.reset();
            this.close();
          } //SI SE LOGRA INGRESAR CON EXITO TODO SE RESETEA EL FORMULARIO x
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
