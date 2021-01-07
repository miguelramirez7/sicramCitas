<template>
  <v-dialog :value="modSintomas" max-width="600px" persistent>
    <loader :dialog="showLoader"/>
    <v-card>
      <v-toolbar color="teal" dark class="pa-0" max-height="60px">
        <v-btn
          color="teal accent-4"
          style="color:white;"
          @click="ingresarCita()"
        >
          Ingresar
          <v-icon>mdi-import</v-icon>
        </v-btn>
        <v-toolbar-title class="ml-5">REGISTRE SINTOMAS</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container pa-1 style="color:#333333;">
          <v-row>
            <v-col md="12" sm="12">
              Describa con el mayor detalle posible sus sintomas o molestias
              actuales:
            </v-col>
            <v-col md="12" sm="12">
              <v-textarea color="teal" filled rows="1" no-resize></v-textarea>
            </v-col>
            <v-col md="12" sm="12">
              ¿Ha tenido atención médica en esta plataforma en las últimas 24
              horas?
            </v-col>
            <v-col md="6" sm="6">
              <v-checkbox
                pd-0
                label="SI"
                color="orange darken-3"
                value="SI"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col md="6" sm="6">
              <v-checkbox
                label="NO"
                color="orange darken-3"
                value="NO"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col md="12" sm="12">
              ¿Sufre de alguna alergía?
            </v-col>

            <v-col md="6" sm="6">
              <v-checkbox
                pd-0
                label="SI"
                color="orange darken-3"
                value="SI"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col md="6" sm="6">
              <v-checkbox
                label="NO"
                color="orange darken-3"
                value="NO"
                hide-details
              ></v-checkbox>
            </v-col>

            <v-col md="12" sm="12">
              Digite su(s) alergia(s):
            </v-col>
            <v-col md="12" sm="12">
              <v-textarea
                color="teal"
                filled
                rows="1"
                no-resize
                name="input-7-4"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import Loader from '@/modals/Loader.vue';
export default {
  components: { Loader },
  name: "RegistrarSintomas",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    idDoctor: {
      type: String,
      required: false,
    },
    idCita: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      showLoader : false,
    };
  },
  computed: {
    modSintomas() {
      return this.dialog;
    },
  },
  methods: {
    ...mapActions(['save_idCita']),
    close() {
      this.$emit("close");
    },
    ingresarCita() {
        this.showLoader = true 
        setTimeout(() => {
        this.showLoader = false;
        this.save_idCita(this.idCita)
        this.$router.push({
          name: "CitaPaciente",
          params: { id:this.idDoctor },
        })
      }, 1500);
      
    },
  },
};
</script>

<style scoped>
.colorLetra {
  color: #000000;
}
</style>
