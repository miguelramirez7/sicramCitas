<template>
  <v-dialog :value="receta" max-width="979px" persistent>
    <!---LOADER--->
    <loader :dialog="showLoader" />
    <!--PREGUNTA-->
    <questioner
      :dialog="showQuestioner"
      :title="'Registrar Receta'"
      :message="'Solo se puede registrar una vez la receta médica de una cita ¿Está seguro que desea registrar la receta médica? '"
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
            {{ data.nombre }} {{ data.apellido }}
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
                  v-model="element.medicamento"
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
                  v-model="element.dosis_frecuencia"
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
                    v-model="infoReceta.fecha_expedicion"
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
                  v-model="infoReceta.fecha_expedicion"
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
                    v-model="infoReceta.valida_hasta"
                    label="VÁLIDA HASTA"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  color="teal"
                  v-model="infoReceta.valida_hasta"
                  :min="date1"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col md="4" sm="4">
              <img class="signature" v-if="signa!=null" :src="signa" />
              <input
                  type="file"
                  name="image"
                  @change="getImage"
                  accept="image/*"
                />
                
                
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
              <v-btn @click="registrar" class="mr-5" color="green " dark>
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
import Firma from "./Firma.vue";


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
      default: {
        nombre: "NOMBRE PACIENTE",
        apellido: "APELLIDO PACIENTE"
      },
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
      infoReceta: {
        medicamentos: [],
        fechaExpedicion: "",
        fechaVencimiento: "",
        firma: null,
      },
      firma_imagen: null,
      signa: null,

    };
  },
  computed: {
    ...mapGetters(["getReglas","getUsuario","get_idCita","getAlert"]),
    receta() {
      return this.dialog;
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
    ...mapActions(['registrarRecetaMedica']),
    //PARA LA FIRMA
    getImage(event) {
      //Asignamos la imagen a  nuestra data
      this.firma_imagen = event.target.files[0];
      this.signa = URL.createObjectURL(this.firma_imagen)
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

    registrar(){
      if (this.numMedicamentos == 0) {
        this.alert.tipo = "warning";
        this.alert.mensaje = "Registre almenos 1 medicamento!";
        this.showAlert = true;
      }
      if (this.$refs.form.validate() && this.numMedicamentos > 0){
        this.showQuestioner = true
      }
    },

    registrarReceta(){
      this.showQuestioner = false
      this.showLoader = true
      console.log(this.infoReceta)
      var data = new FormData()
      console.log(this.firma_imagen)
      data.append("acto_medico", "que cha se yo")
      data.append("firma_imagen", this.firma_imagen);
      data.append("id_cita", this.get_idCita);
      data.append("fecha_expedicion", this.infoReceta.fecha_expedicion);
      data.append("valida_hasta", this.infoReceta.valida_hasta);
      for (let i = 0; i < this.numMedicamentos; i++) {
        data.append(
          "medicamentos[" + i + "][medicamento]",
          this.infoReceta.medicamentos[i].medicamento
        );
        data.append(
          "medicamentos[" + i + "][concentracion]",
          this.infoReceta.medicamentos[i].concentracion
        );
        data.append(
          "medicamentos[" + i + "][dosis_frecuencia]",
          this.infoReceta.medicamentos[i].dosis_frecuencia
        );
        data.append(
          "medicamentos[" + i + "][duracion]",
          this.infoReceta.medicamentos[i].duracion
        );
        data.append(
          "medicamentos[" + i + "][cantidad]",
          this.infoReceta.medicamentos[i].cantidad
        );
      }
      let datos = {
        doctor: this.getUsuario,
        lista: data,
      };
      console.log(JSON.stringify(data));
      this.registrarRecetaMedica(datos).then((res) => {
        this.showLoader = false
        this.alert.tipo = this.getAlert.tipoAlerta
        this.alert.mensaje = this.getAlert.mensajeAlerta
        this.showAlert = true
        
      });

    }
  },
};
</script>

<style lang="scss" scoped>
.signature {
  height: 70px;
  width: 170px;
  border-bottom: 1px  black solid ;
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
