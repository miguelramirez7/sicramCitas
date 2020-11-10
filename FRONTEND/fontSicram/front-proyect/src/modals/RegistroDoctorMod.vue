<template>
  <v-dialog :value="regDocDialog" max-width="600px" persistent>
    <v-card color="grey lighten-5">
      <v-card-title>
        <span class="headline">REGISTRO DE DOCTOR</span>
      </v-card-title>
      <v-card-text class="pa-2">
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="12" sm="6" md="6" class="">
                <v-text-field
                  label="Nombres*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Apellidos*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Correo*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido, getReglas.correo]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Contraseña*"
                  type="password"
                  required
                  color="cyan"
                  :rules="[
                    getReglas.requerido,
                    getReglas.pass,
                    getReglas.minimochar,
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="DNI*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido, getReglas.DNI]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['MASCULINO', 'FEMENINO']"
                  label="Género*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido]"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="CMP*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Especialidad*"
                  color="cyan"
                  required
                  :rules="[getReglas.requerido]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Edad*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Número de celular"
                  color="cyan"
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
        <v-btn color="blue darken-1" text @click="validate()">
          Registrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RegistroDoctorMod",
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
    ...mapGetters(["getReglas"]),
    regDocDialog() {
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
