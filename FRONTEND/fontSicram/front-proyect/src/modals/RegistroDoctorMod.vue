<template>
  <v-dialog :value="regDocDialog" max-width="600px" persistent>
    <v-card color="grey lighten-5">
      <v-card-title>
        <span class="headline">REGISTRO DE DOCTOR</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Nombres*"
                required
                color="cyan"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Apellidos*"
                required
                color="cyan"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Correo*"
                required
                color="cyan"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Contraseña*"
                type="password"
                required
                color="cyan"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="DNI*" required color="cyan"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="['MASCULINO', 'FEMENINO']"
                label="Género*"
                required
                color="cyan"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Edad*" required color="cyan"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Número de celular"
                color="cyan"
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
        <v-btn color="blue darken-1" text @click="close()">
          Registrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RegistroDoctorMod",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    regDocDialog() {
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
