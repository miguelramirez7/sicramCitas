<template>
  <v-dialog :value="informe" max-width="750px" persistent>
    <!---LOADER--->
    <loader :dialog="showLoader" />
    <!--PREGUNTA-->
    <questioner
      :dialog="showQuestioner"
      :title="'Registrar Informe'"
      :message="'¿Está seguro que desea registrar el Informe médico?'"
      @accept="registrarInforme"
      @close="showQuestioner = false"
    />
    <!---ALERT---->
    <alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    />
    <!-- :tipo="" :mensaje:""-->
    <v-card color="white" v-if="data !== null">
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
          <v-col md="3" sm="3">NOMBRES Y APELLIDOS DOCTOR</v-col>
          <v-col class="text-center" md="9" sm="9">
            {{ data.nombre }} {{ data.apellido }}
          </v-col>
        </v-row>

        <v-form ref="form" lazy-validation @submit.prevent="registrar">
          <v-row no-gutters class="ma-5">
            <v-col md="3" sm="3">
              ANAMNESIS:
            </v-col>
            <v-col md="9" sm="9">
              <v-textarea
                v-model="infoInforme.anamnesis"
                dense
                rows="1"
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
                v-model="infoInforme.resultados_labo"
                no-resize
                outlined
                color="teal"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row no-gutters class="text-right ">
            <v-col>
              <v-btn type="submit" class="mr-5" color="blue " dark>
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
import { mapActions, mapGetters } from "vuex";
import Alert from "@/modals/Alert.vue";
import Loader from "@/modals/Loader.vue";
import Questioner from "@/modals/Questioner.vue";

export default {
  components: {  Loader, Questioner, Alert },
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
      },
    },
  },
  data() {
    return {
      showAlert: false,
      showQuestioner: false,
      showLoader: false,
      infoInforme: {
        anamnesis: "",
        diagnostico: "",
        resultados_labo: "",
        tratamiento: "",
        id_cita : ""
      },
    };
  },
  computed: {
    ...mapGetters(["getAlert","getReglas", "getUsuario", "get_idCita"]),
    informe() {
      return this.dialog;
    },
  },
  methods: {
    ...mapActions(["registrarInformeMedico"]),
    close() {
      this.$emit("close");
    },
    registrar() {
      console.log(this.infoInforme)
      if (this.$refs.form.validate()) {
        this.showQuestioner = true
      }
    },
    registrarInforme() {
      
      this.infoInforme.id_cita = this.get_idCita
      this.showQuestioner = false
      this.showLoader = true
      const datos = {
        doctor: this.getUsuario,
        informe: this.infoInforme,
      };
      this.registrarInformeMedico(datos).then((res) => {
        this.showLoader = false
        this.showAlert = true
      });
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
