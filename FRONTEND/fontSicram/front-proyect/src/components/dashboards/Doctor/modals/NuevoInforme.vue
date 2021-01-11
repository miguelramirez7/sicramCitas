<template>
  <v-dialog :value="informe" max-width="750px" persistent>
    <!---LOADER--->
    <loader :dialog="showLoader" />
    <!--PREGUNTA-->
    <questioner
      :dialog="showQuestioner"
      :title="'Registrar Informe'"
      :message="'¿Está seguro que desea registrar el Informe médico?'"
      @accept="registrarReceta"
      @close="showQuestioner = false"
    />
    <!---ALERT---->
    <alert
      @close="showAlert = false"
      :dialog="showAlert"
      :tipo="alert.tipo"
      :mensaje="alert.mensaje"
    />
    <!-- :tipo="" :mensaje:""-->
    <v-card color="white">
      <v-card-text style="color:black;">
        <v-row no-gutters class="pt-2 pb-5">
          <v-col class="text-center" md="8" sm="8">
            <h2 class="pl-10 pt-5 pb-8">INFORME MÉDICO</h2></v-col
          >
          <v-col class="text-center" md="4" sm="4">
            <v-row no-gutters>
              <v-col md="3">
                <img class="ico" src="@/assets/iconoDoctor.png" />
              </v-col>
              <v-col class="text-justify" md="9">
                <div class="letra-ico">
                  SICRAM: Sistema integral de citas, atencion medica para
                  personas discapacitadas. https://sicramprueba2.herokuapp.com/
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="text-center" md="3" sm="3">NOMBRES Y APELLIDOS </v-col>
          <v-col class="text-center" md="9" sm="9">
            {{ infoInforme.nombre }} {{ infoInforme.apellido }}
          </v-col>
        </v-row>

        <v-form
          ref="form"
          lazy-validation
          @submit.prevent="showQuestioner = true"
        >
          <v-row no-gutters class="ma-5">
            <v-col md="3" sm="3">
              ANAMNESIS:
            </v-col>
            <v-col md="9" sm="9">
              <v-textarea
                :rules="[getReglas.requerido]"
                dense
                rows="1"
                v-model="infoInforme.anamnesis"
                outlined
                no-resize
                color="teal"
              ></v-textarea>
            </v-col>
            <v-col md="3" sm="3">
              TRATAMIENTO:
            </v-col>
            <v-col md="9" sm="9">
              <v-textarea
                :rules="[getReglas.requerido]"
                dense
                no-resize
                v-model="infoInforme.tratamiento"

                rows="1"
                outlined
                color="teal"
              ></v-textarea>
            </v-col>
            <v-col md="3" sm="3">
              DIAGNÓSTICO:
            </v-col>
            <v-col md="9" sm="9">
              <v-textarea
                :rules="[getReglas.requerido]"
                dense
                no-resize
                v-model="infoInforme.diagnostico"

                rows="1"
                outlined
                color="teal"
              ></v-textarea>
            </v-col>
            <v-col md="3" sm="3">
              ÚLTIMA EVOLUCIÓN:
            </v-col>
            <v-col md="9" sm="9">
              <v-textarea
                :rules="[getReglas.requerido]"
                dense
                rows="1"
                v-model="infoInforme.ultimaEvolucion"

                no-resize
                outlined
                color="teal"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row no-gutters class="text-right ">
            <v-col>
              <v-btn @click="saveInform" type="submit" class="mr-5" color="blue " dark>
                Registrar
                <v-icon right dark>
                  mdi-file-upload
                </v-icon>
              </v-btn>
              <v-btn @click="close" color="red " dark>
                Cerrar
                <v-icon right dark>
                  mdi-close
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import Alert from "@/modals/Alert.vue";
import Loader from "@/modals/Loader.vue";
import Questioner from "@/modals/Questioner.vue";
import Firma from "./Firma.vue";

const axios = require("axios");
//BASE URL POR DEFAULT EN LOCAL HOST
axios.defaults.baseURL = "http://localhost:3000/api";
export default {
  components: { Firma, Loader, Questioner, Alert },
  name: "NuevoInforme",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      required: false,
      default: {
        nombre: "NOMBRE DOCTOR",
        apellido: "APELLIDO DOCTOR",
        fecha: "2020-20-20",
        especialidad: "",
        anamnesis: "",
        diagnostico: "",
        tratamiento: "",
        ultimaEvolucion: "",
      },
    },
  },
  data() {
    return {
      alert: {
        tipo: "info",
        mensaje: "",
      },
      showFirma: false,
      showAlert: false,
      showQuestioner: false,
      showLoader: false,
      infoInforme: null,
    };
  },
  computed: {
    ...mapGetters(["getReglas"]),
    informe() {
      return this.dialog;
    },
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.infoInforme = val;
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    saveInform(){
      axios
        .post(
          `/doctor/generar-informe/${this.$route.params.id}`,
          this.infoInforme
        )
        .then((response) => {
          console.log("Fue generado");
          this.close();
        });
    },
    agregarMedicamento() {
      if (this.numMedicamentos == this.maxMedicamentos) {
        console.log("Llego al máximo.");
      } else {
        let medicamentos = {
          medicamento: "",
          concentracion: "",
          dosis_frecuencia: "",
          duracion: "",
          cantidad: "",
        };
        this.numMedicamentos = 1 + this.numMedicamentos;
        this.medicamentos.push(medicamentos);
        console.log(this.medicamentos);
      }
    },
    eliminarMedicamento(index) {
      this.numMedicamentos = this.numMedicamentos - 1;
      //var i = this.medicamentos.indexOf(item)
      if (index !== -1) {
        this.medicamentos.splice(index, 1);
      }
    },
    registrarReceta() {
      this.showQuestioner = false;
      if (this.$refs.form.validate()) {
        console.log("bien");
      } else {
        console.log("mal");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.titulo-medicamentos {
  background: rgb(224, 222, 222);
  height: 32px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.ico {
  width: 60px;
  height: 75px;
}
.letra-ico {
  line-height: 20px;
  font-size: 9px;
  padding: 0px 5px 5px 5px;
}
</style>
