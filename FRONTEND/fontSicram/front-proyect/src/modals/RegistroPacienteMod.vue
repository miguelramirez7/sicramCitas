<template>
  <v-dialog :value="regPacDialog" max-width="600px" persistent>
    <v-card color="grey lighten-5">
      <v-card-title>
        <span class="headline ">REGISTRO DE PACIENTE</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Nombres*"
                  :rules="[getReglas.requerido]"
                  required
                  color="light-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Apellidos*"
                  :rules="[getReglas.requerido]"
                  required
                  color="light-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Correo*"
                  :rules="[getReglas.requerido, getReglas.correo]"
                  required
                  color="light-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Contraseña*"
                  :rules="[getReglas.requerido,getReglas.pass,getReglas.minimochar]"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  required
                  color="light-blue"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="DNI*"
                  :rules="[getReglas.DNI]"
                  required
                  color="light-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :rules="[getReglas.requerido]"
                  :items="['MASCULINO', 'FEMENINO']"
                  label="Género*"
                  required
                  color="light-blue"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  type="number"
                  label="Edad*"
                  :rules="[getReglas.requerido]"
                  required
                  color="light-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Número de celular"
                  color="light-blue"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>

        <small>*Datos obligatorios a llenar.</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="pink darken-1" text @click="close()">
          Cerrar
        </v-btn>
        <v-btn color="blue darken-1" text @click="validate">
          Registrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapState } from "vuex";
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
      valid: true, //VALIDACIÓN DEL FORMULARIO
      show1: false, //MOSTRAR CONTRASEÑA
    };
  },
  computed: {
    ...mapGetters([
      "getReglas",
    ]),
    regPacDialog() {
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
