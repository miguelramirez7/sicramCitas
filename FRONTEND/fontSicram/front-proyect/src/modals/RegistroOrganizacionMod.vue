<template>
  <v-dialog :value="regOrgDialog" max-width="600px" persistent content-class="modal">
    <v-card color="grey lighten-5">
      <v-card-title>
        <span class="headline">REGISTRO DE ORGANIZACION</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Correo*"
                :rules="[getReglas.correo,getReglas.requerido]"
                required
                color="blue"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
               label="Contraseña*"
                  :rules="[getReglas.requerido,getReglas.pass,getReglas.minimochar]"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  required
                  color="blue"
                  @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="Nombre organización*"
                :rules="[getReglas.requerido]"
                required
                color="blue"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Dirección"
                required
                color="blue"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="R.U.C.*"
                required
                color="blue"
                :rules="[getReglas.requerido]"
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
import { mapGetters } from 'vuex';

export default {
  name: "RegistroOrganizacionMod",
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
    regOrgDialog() {
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
