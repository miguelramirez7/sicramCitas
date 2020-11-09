<template>
  <v-dialog :value="regPacDialog" max-width="600px" persistent>
    
    <v-card color="grey lighten-5">
      <v-card-title>
        <span class="headline ">REGISTRO DE PACIENTE</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form"  lazy-validation>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Nombres*"
                  :rules="getReglasCampoRequerido"
                  required
                  color="light-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Apellidos*"
                  :rules="getReglasCampoRequerido"
                  required
                  color="light-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Correo*"
                  :rules="getReglasCorreo"
                  required
                  color="light-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Contraseña*"
                  type="password"
                  required
                  color="light-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="DNI*"
                  :rules="getReglasDNI"
                  required
                  color="light-blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :rules="getReglasCampoRequerido"
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
                  :rules="getReglasEdad"
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
      
    };
  },
  computed: {
    ...mapGetters([
      "getReglasCorreo",
      "getReglasCampoRequerido",
      "getReglasDNI",
      "getReglasEdad"
    ]),
    regPacDialog() {
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
