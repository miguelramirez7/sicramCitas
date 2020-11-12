<template>
  <v-dialog :value="regPacDialog" max-width="600px" persistent>
    <v-card color="grey lighten-5">
      <v-form ref="form" lazy-validation @submit.prevent="registrar">
        <v-card-title>
          <span class="headline ">REGISTRO DE PACIENTE</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  type="text"
                  label="Nombres*"
                  :rules="[getReglas.requerido]"
                  required
                  color="light-blue"
                  v-model="pacienteDatos.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  type="text"
                  label="Apellidos*"
                  :rules="[getReglas.requerido]"
                  required
                  color="light-blue"
                  v-model="pacienteDatos.lastname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  type="text"
                  label="Correo*"
                  :rules="[getReglas.requerido, getReglas.correo]"
                  required
                  color="light-blue"
                  v-model="pacienteDatos.email"
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
                  color="light-blue"
                  @click:append="show1 = !show1"
                  v-model="pacienteDatos.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="DNI*"
                  :rules="[getReglas.DNI]"
                  required
                  color="light-blue"
                  v-model="pacienteDatos.dni"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  type="text"
                  :rules="[getReglas.requerido]"
                  :items="['MASCULINO', 'FEMENINO']"
                  label="Género*"
                  required
                  color="light-blue"
                  v-model="pacienteDatos.direccion"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  type="number"
                  label="Edad*"
                  :rules="[getReglas.requerido]"
                  required
                  color="light-blue"
                  v-model="pacienteDatos.edad"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Número de celular"
                  color="light-blue"
                  v-model="pacienteDatos.celular"
                  type="number"
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
          <v-btn type="submit" color="blue darken-1" text>
            Registrar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "RegistroPacienteMod",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show1: false, //MOSTRAR CONTRASEÑA
      pacienteDatos: {
        password: "",
        email: "",
        name: "",
        lastname: "",
        direccion: "",
        dni: "",
        edad: "",
        celular: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getReglas"]),
    regPacDialog() {
      return this.dialog;
    },
  },
  methods: {
    ...mapActions(["registrarPaciente"]),
    //PARA CERRAR EL MODAL
    close() {
      this.$emit("close");
    },
    //REGISTRO DE PACIENTE
    registrar() {
      const datos = this.pacienteDatos
      console.log("datos")
      console.log(this.pacienteDatos)
      //if(this.$refs.form.validate()){
      //  console.log("REGITRAR")
      //  console.log("PACIENTE :" , this.pacienteDatos)
      // this.registrarPaciente(this.pacienteDatos)
      //}else{
      //  console.log("MOSTRAR MENSAJE NEGATIVO")
      //}
     
      this.axios
        .post(
          "http://localhost:3000/api/signupuser",{...datos})
        .then((res) => {
          console.log(res.data.msg);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
