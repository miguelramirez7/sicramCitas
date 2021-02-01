<template>
  <v-dialog :value="modSintomas" max-width="600px" persistent>
    <!--CARGADOR-->
    <loader :dialog="showLoader" />
    <!--ALERTA-->
    <alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    />
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
              <v-textarea
                v-model="sintomas.sintoma"
                color="teal"
                filled
                rows="1"
                no-resize
              ></v-textarea>
            </v-col>

            <v-col md="6" sm="6">
              <v-row>
                <v-col sm="12">
                  ¿Ha tenido atención médica en esta plataforma en las últimas
                  24 horas?
                </v-col>
                <v-col cols="12">
                  <v-switch
                    color="teal"
                    v-model="sintomas.tratamiento_reciente"
                    :label="
                      sintomas.tratamiento_reciente
                        ? 'Sí, he recibido atención médico'
                        : 'No en las últimas 24 horas'
                    "
                  ></v-switch>
                </v-col>
              </v-row>
            </v-col>

            <v-col md="6" sm="12">
              <v-row>
                <v-col cols="12">
                  ¿Sufre de alguna alergía?
                </v-col>
                <v-col sm="12">
                  <v-switch
                    color="teal"
                    v-model="sintomas.alergia"
                    :label="
                      sintomas.alergia
                        ? 'Sí, sufro de alguna alergía'
                        : 'No poseo alergías'
                    "
                  ></v-switch>
                </v-col>
              </v-row>
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
import { mapActions, mapGetters } from "vuex";
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";

export default {
  components: { Loader, Alert },
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
    },
  },
  data() {
    return {
      showLoader: false,
      showAlert: false,
      sintomas: {
        sintoma: "",
        tratamiento_reciente: false,
        alergia: false,
        id_cita: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUsuario", "getAlert"]),
    modSintomas() {
      return this.dialog;
    },
  },
  methods: {
    ...mapActions(["save_idCita", "registrarSintomas"]),
    close() {
      this.$emit("close");
    },
    ingresarCita() {
      //if (this.$refs.form.validate()) {
        this.sintomas.id_cita = this.idCita;
        this.save_idCita(this.idCita);
        this.showLoader = true;
        const datos = {
          paciente: this.getUsuario,
          sintomas: this.sintomas,
        };
        this.registrarSintomas(datos).then((res) => {
          this.showLoader = false;
          this.showAlert = true;
          if (res == true) {
            this.$router.push({
              name: "CitaPaciente",
              params: { id: this.idDoctor },
            });
          }
        });
      //}
    },
  },
};
</script>

<style scoped>
.colorLetra {
  color: #000000;
}
</style>
