<template>
  <v-dialog :value="regOrgDialog" max-width="600px" persistent>
    <v-card color="grey lighten-5">
      <v-card-title>
        <span class="headline">REGISTRO DE ORGANIZACION</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Correo*"
                :rules="getReglasCorreo"
                required
                color="blue"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Contraseña*"
                type="password"
                required
                color="blue"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                label="Nombre organización*"
                :rules="getReglasCampoRequerido"
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
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*Datos obligatorios a llenar.</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="pink darken-1" text @click="close()">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="close()">
          Save
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
  computed: {
    ...mapGetters([
      "getReglasCorreo",
      "getReglasCampoRequerido",
      "getReglasEdad"
    ]),
    regOrgDialog() {
      return this.dialog;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
