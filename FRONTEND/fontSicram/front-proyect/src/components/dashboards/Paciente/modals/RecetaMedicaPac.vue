<template>
  <v-dialog :value="receta" max-width="979px" persistent>
    <!---LOADER--->

    <v-card color="white">
      <v-card-text style="color:black;" color="white" id='inprime'>
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
            <label for="" class="label-receta">
              LUIS ENRIQUE MEDINA CASTILLO
            </label>
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
          <div class="caja-medicamentos">
            <v-row v-for="(element, index) in data.medicamentos" :key="index">
              <v-col md="4" sm="4">
                <label for="" class="label-receta">
                  {{ element.medicamento }}
                </label>
              </v-col>
              <v-col md="2" sm="2">
                <label for="" class="label-receta">
                  {{ element.concentracion }}
                </label>
              </v-col>
              <v-col md="2" sm="2">
                <label for="" class="label-receta">
                  {{ element.dosis_frecuencia }}
                </label>
              </v-col>
              <v-col md="2" sm="2"
                ><label for="" class="label-receta">
                  {{ element.duracion }}
                </label>
              </v-col>
              <v-col md="2" sm="2">
                <label for="" class="label-receta">
                  {{ element.cantidad }}
                </label>
              </v-col>
            </v-row>
          </div>
          <v-row class="mt-2 ">
            <v-col md="4" sm="4" class="mt-4">
                FECHA DE EXPEDICIÓN
              <label for="" class="label-receta">
                <v-icon> mdi-calendar-today</v-icon> {{ data.fecha_expedicion }}
              </label>
              
            </v-col>
            <v-col md="4" sm="4" class="mt-4">
                VÁLIDA HASTA
              <label for="" class="label-receta">
                <v-icon> mdi-calendar-today</v-icon> {{ data.valida_hasta }}
              </label>
            </v-col>
            <v-col md="4" sm="4" class="text-center">
              <img class="signature" :src="data.firma" /><br />
              {{doctor.nombre}} {{doctor.apellido}} {{doctor.dni}}
            </v-col>
          </v-row>
      </v-card-text>
      <v-card-text>
          <v-row no-gutters class="text-right ">
            <v-col>
              <v-btn @click="impimir" color="blue" class="mr-3" dark>
                Imprimir
                <v-icon right dark>
                  mdi-printer
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
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {print} from '../../../../imprimeDom';
import { mapActions } from 'vuex';
export default {
  name: "RecetaMedicaPac",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    paciente: {
      type: Object,
      default: {
        nombre: "NOMBRE PACIENTE",
        apellido: "APELLIDO PACIENTE",
      },
      required: false,
    },
    doctor: {
      type: Object,
      default: {
        nombre: "NOMBRE PACIENTE",
        apellido: "APELLIDO PACIENTE",
        dni : "74891755"
      },
      required: false,
    },
    data: {
      type: Object,
      default: {
        nombre: "NOMBRE PACIENTE",
        apellido: "APELLIDO PACIENTE",
      },
      required: false,
    },
  },
  data() {
    return {
      medicamentos: [],
    };
  },
  computed: {
    receta() {
      return this.dialog;
    },
  },

  methods: {
      ...mapActions(['imprimirDom']),
    close() {
      this.$emit("close");
    },
    impimir(){
        print('inprime');
    }
  },
};
</script>

<style lang="scss" scoped>
.label-receta {
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border: 1px solid rgb(180, 180, 180);
  padding: 5px 0px 0px 10px;
}
.signature {
  height: 70px;
  width: 170px;
  border-bottom: 1px black solid;
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
