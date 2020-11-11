<template>
  <v-dialog :value="regPacDialog" max-width="600px" persistent>
    <v-card color="grey lighten-5">
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="registrar"
      >
        <v-card-title>
          <span class="headline ">REGISTRO DE PACIENTE</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Nombres*"
                  :rules="[getReglas.requerido]"
                  required
                  color="light-blue"
                  v-model="pacienteDatos.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Apellidos*"
                  :rules="[getReglas.requerido]"
                  required
                  color="light-blue"
                  v-model="pacienteDatos.lastname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
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
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :rules="[getReglas.requerido]"
                  :items="['MASCULINO', 'FEMENINO']"
                  label="Género*"
                  required
                  color="light-blue"
                  v-model="pacienteDatos.genero"
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
          <v-btn type="submit" color="blue darken-1" text >
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
      pacienteDatos : {
        password: "",
        email:"",
        name:"",
        lastname:"",
        dni:"",
        edad:"",
        celular:"",
        genero:"",
      }
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
    registrar(){
      if(this.$refs.form.validate()){
        console.log("REGITRAR")
        console.log("PACIENTE :" , this.pacienteDatos)
        this.registrarPaciente(this.pacienteDatos)
      }else{
        console.log("MOSTRAR MENSAJE NEGATIVO")
      }
    }
  },
};
</script>

<style></style>
