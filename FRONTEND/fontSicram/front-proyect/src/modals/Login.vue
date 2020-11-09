<template>
  <v-dialog  :value="loginDialog" @click:outside="close()" max-width="600px">
    <v-row no-gutters>
      <v-col cols="6" >
        <v-card class="rounded-0">
          <v-card-title class="d-flex justify-center">
            <span class="headline">INICIO DE SESIÓN</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Correo*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Contraseña*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="pink darken-1" text @click="close()">
              Cerrar
            </v-btn>
            <v-btn color="blue darken-1" text @click="close()">
              Ingresar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-img
              src="../assets/doctor-patient.jpg"
              height="100%"
              background= "red"
            >
            </v-img>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
export default {
  name: "Login",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    loginDialog() {
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
