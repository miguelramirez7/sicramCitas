<template>
  <v-dialog :value="loginDialog"  max-width="600px" persistent>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card class="rounded-0">
          <v-card-title class="d-flex justify-center">
            <span class="headline">INICIO DE SESIÓN</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Correo*"
                    :rules="[getReglas.requerido,getReglas.correo]"
                    required
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
                  ></v-text-field>
                </v-col>
              </v-row>
               </v-form>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="pink darken-1" text @click="close()">
              Cerrar
            </v-btn>
            <v-btn color="blue darken-1" text @click="validate()">
              Ingresar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-img
          src="../assets/doctor-patient.jpg"
          height="100%"
          background="red"
        >
        </v-img>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data(){
    return{
      valid: true, //VALIDACIÓN DEL FORMULARIO
      show1: false, //MOSTRAR CONTRASEÑA
    }
  },
  computed: {
    ...mapGetters(["getReglas"]),
    loginDialog() {
      return this.dialog;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    //VALIDAR EL FORMULARIO
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style></style>
