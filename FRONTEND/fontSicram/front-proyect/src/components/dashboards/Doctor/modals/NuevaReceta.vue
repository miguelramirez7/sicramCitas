<template>
  <v-dialog :value="receta" max-width="979px" persistent>
    <!---LOADER--->
    <loader :dialog="showLoader" />
    <!--PREGUNTA-->
    <questioner
      :dialog="showQuestioner"
      :title="'Registrar Receta'"
      :message="'¿Está seguro que desea registrar la receta médica?'"
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
    <!--MODAL FIRMA-->
    <firma :dialog="showFirma" @close="showFirma = false" />
    <!--------------->
    <v-card color="white">
      <v-card-text style="color:black;">
        <v-row no-gutters class="pt-2 pb-2">
          <v-col class="text-center" md="9" sm="9">
            <h2 class="pl-10 pt-8 pb-8">RECETA MÉDICA</h2></v-col
          >
          <v-col class="text-center" md="3" sm="3">
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
            {{ infoReceta.nombre }} {{ infoReceta.apellido }}
          </v-col>
          <v-col md="12" sm="12"
            >Agregue medicamentos
            <v-btn
              dark
              fab
              color="teal lighten-1"
              x-small
              @click="agregarMedicamento"
              ><v-icon dark>
                mdi-plus
              </v-icon></v-btn
            >
          </v-col>
        </v-row>

        <v-row class="text-center mb-2 titulo-medicamentos" no-gutters>
          <v-col md="4" sm="4"> MEDICAMENTO </v-col>
          <v-col md="2" sm="2" style="border-left:1px solid;">
            CONCENTRACIÓN
          </v-col>
          <v-col md="2" sm="2" style="border-left:1px solid;">
            FRECUENCIA
          </v-col>
          <v-col md="2" sm="2" style="border-left:1px solid;"> DURACIÓN </v-col>
          <v-col md="2" sm="2" style="border-left:1px solid;"> CANTIDAD </v-col>
        </v-row>
        <v-form
          ref="form"
          lazy-validation
          @submit.prevent="showQuestioner = true"
        >
          <div class="caja-medicamentos">
            <v-row
              v-for="(element, index) in infoReceta.medicamentos"
              :key="index"
            >
              <v-col md="1" sm="1">
                <v-btn
                  dark
                  fab
                  color="red lighten-1"
                  x-small
                  @click="eliminarMedicamento(index)"
                  ><v-icon dark>
                    mdi-minus
                  </v-icon></v-btn
                >
              </v-col>
              <v-col md="3" sm="3">
                <v-text-field
                  :rules="[getReglas.requerido]"
                  dense
                  outlined
                  color="teal"
                  v-model="element.nombre"
                ></v-text-field>
              </v-col>
              <v-col md="2" sm="2">
                <v-text-field
                  :rules="[getReglas.requerido]"
                  dense
                  outlined
                  color="teal"
                  v-model="element.concentracion"
                  >></v-text-field
                ></v-col
              >
              <v-col md="2" sm="2">
                <v-text-field
                  :rules="[getReglas.requerido]"
                  dense
                  outlined
                  color="teal"
                  v-model="element.frecuencia"
                  >></v-text-field
                >
              </v-col>
              <v-col md="2" sm="2"
                ><v-text-field
                  :rules="[getReglas.requerido]"
                  outlined
                  color="teal"
                  dense
                  v-model="element.duracion"
                  >></v-text-field
                >
              </v-col>
              <v-col md="2" sm="2"
                ><v-text-field
                  :rules="[getReglas.requerido]"
                  dense
                  outlined
                  color="teal"
                  v-model="element.cantidad"
                  >></v-text-field
                ></v-col
              >
            </v-row>
          </div>
          <v-row class="text-center">
            <v-col md="4" sm="4">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :rules="[getReglas.requerido]"
                    color="teal"
                    v-model="infoReceta.fechaExpedicion"
                    label="FECHA DE EXPEDICIÓN"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :min="date"
                  color="teal"
                  v-model="infoReceta.fechaExpedicion"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col md="4" sm="4">
              <v-menu
                :rules="[getReglas.requerido]"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :rules="[getReglas.requerido]"
                    color="teal"
                    v-model="infoReceta.fechaVencimiento"
                    label="VÁLIDA HASTA"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="teal"
                  v-model="infoReceta.fechaVencimiento"
                  :min="date1"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col md="4" sm="4">
              <v-file-input
                :rules="[getReglas.requerido]"
                accept="image/*"
                color="teal"
                label="Firma imagen"
                @change="subido"
                v-model="infoReceta.firma"
              ></v-file-input>
            </v-col>
          </v-row>

          <v-row no-gutters class="text-center mb-7" v-show="imgTemp">
            <v-col>
              <img class="signature" :src="imgTemp" alt="" />
            </v-col>
          </v-row>

          <v-row no-gutters class="text-right ">
            <v-col>
              <v-btn @click="showFirma = true" class="mr-5" color="blue" dark>
                Firmar
                <v-icon right>
                  mdi-draw
                </v-icon>
              </v-btn>
              <v-btn @click="registrarReceta" class="mr-5" color="green " dark>
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
  name: "NuevaReceta",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      required: false,
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
      maxMedicamentos: 5,
      numMedicamentos: 0,
      medicamentos: [],
      date: new Date().toISOString().substr(0, 10),
      date1: new Date().toISOString().substr(0, 10),
      date2: null,
      menu1: false,
      menu2: false,
      infoReceta: null,
      imgTemp: "",
    };
  },
  computed: {
    ...mapGetters(["getReglas"]),
    receta() {
      return this.dialog;
    },
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.infoReceta = val;
        this.numMedicamentos= val.medicamentos.length

        // SI LA RECETA TRAIDA POSEE UNA FIRMA
        this.imgTemp = `http://localhost:3000/api/uploads/${val.firma}`;
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    subido(event) {
      var input = event.target;

      this.infoReceta.firma = event;

      let reader = new FileReader();

      reader.onload = (e) => {
        this.imgTemp = e.target.result;
      };

      reader.readAsDataURL(event);
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
        this.infoReceta.medicamentos.push(medicamentos);
      }
    },
    eliminarMedicamento(index) {
      this.numMedicamentos = this.numMedicamentos - 1;
      //var i = this.medicamentos.indexOf(item)
      if (index !== -1) {
        this.infoReceta.medicamentos.splice(index, 1);
      }
    },
    async registrarReceta() {
      this.showQuestioner = false;
      if (this.numMedicamentos == 0) {
        this.alert.tipo = "warning";
        this.alert.mensaje = "Registre almenos 1 medicamento!";
        this.showAlert = true;
      }
      if (this.$refs.form.validate() && this.numMedicamentos > 0) {
        var bodyFormData = new FormData();

        bodyFormData.append("firma", this.infoReceta.firma);

        if (typeof this.infoReceta.firma == "object") {
          let fileResponse = await axios({
            method: "post",
            url: `/uploadImage`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          });

          this.infoReceta.firma = `${fileResponse.data.filename}`;
        }
        axios({
          method: "post",
          url: `/doctor/generar-receta/${this.$route.params.id}`,
          data: this.infoReceta,
          // headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
          console.log(response);
          console.log("Fue generado");
          this.close();
        });

        return;
      } else {
        console.log("mal");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.signature {
  height: 150px;
  width: 150px;
  object-fit: contain;
  border: rgb(141, 89, 226) solid 2px;
}
.input-medicamentos {
  max-height: 10px !important;
}
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

.caja-medicamentos {
  min-height: 5vh;
  max-height: 25vh;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar:vertical {
    width: 8px;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a7a5a5;
    border-radius: 20px;
    border: 1px solid #f1f2f3;
  }
  &::-webkit-scrollbar-button:increment,
  .contenedor::-webkit-scrollbar-button {
    display: none;
  }
}
</style>
