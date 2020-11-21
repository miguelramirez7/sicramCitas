<template>
    <v-dialog :value="edit" max-width="600px">
      <!----CARGADOR---->
      <Loader :dialog="showLoader" />
      <!----ALERTA---->
      <Alert
        :dialog="showAlert"
        @close="showAlert = false"
        :mensaje="getAlert.mensajeAlerta"
        :tipo="getAlert.tipoAlerta"
      />
      <v-card v-click-outside="close()">
        <v-form ref="form" lazy-validation @submit.prevent="editarHorario">
          <v-container fluid>
            <v-card-title class="titulo"> Editar Horario </v-card-title>
            <v-card-text>
              <v-row>
                <v-col class="pl-4 pr-4" cols="12" md="4">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="200px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Fecha"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="[getReglas.requerido]"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      width="270"
                      v-model="date"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="4" class="pl-4 pr-4">
                  <v-select
                    :items="items"
                    item-text="hora"
                    label="Horario"
                    return-object
                    v-model="rango"
                    :rules="[getReglas.requerido]"
                    v-on:change="rangoHorario"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <div class="text-center">
                    <v-btn elevation="7" color="teal" type="submit"
                      >Editar</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
</template>

<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditarHorarioDoctorMod",
  components: {
    Loader,
    Alert,
  },
  props: {
    //VARIABLE PARA MOSTRAR EL MODAL DE EDITAR
    dialog: {
      type: Boolean,
      default: false,
    },
    //VARIABLE PARA EL ELEMENTO A EDITAR
    element: {
        type: Object,
        default: null,
    }

  },
  data() {
    return {
      showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
      showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      asd: true,
      items: [
        { hora: "8:00-9:00", hora_inicio: "8:00", hora_fin: "9:00" },
        { hora: "9:00-10:00", hora_inicio: "9:00", hora_fin: "10:00" },
        { hora: "10:00-11:00", hora_inicio: "10:00", hora_fin: "11:00" },
        { hora: "11:00-12:00", hora_inicio: "11:00", hora_fin: "12:00" },
      ],
      horario: {
        fecha: "",
        hora_inicio: "",
        hora_fin: "",
      },
      rango: null,
    };
  },
  computed: {
    ...mapGetters(["getReglas", "getUsuario", "getAlert"]),
    edit() {
      return this.dialog;
    },
  },
  methods: {
    ...mapActions(["registrarHorarioDoctor"]),
    //MODIFICA EL HORARIO DEL DOCTOR
    editarHorario() {
      if (this.$refs.form.validate()) {
          console.log(this.element)
          /*
        this.showLoader = true;
        this.horario.fecha = this.date;
        const datos = {
          doctor: this.getUsuario,
          newHorario: this.horario,
        };
        this.registrarHorarioDoctor(datos).then((res) => {
          this.showLoader = false;
          this.showAlert = true;
        });
      } else {
        console.log("CAMPOS VACIOS");*/
      }
    },
    //PONE EL HORARIO DE INICIO FIN EN EL OBJETO PARA AGREGAR HORARIOS
    rangoHorario(e) {
      this.horario.hora_inicio = e.hora_inicio;
      this.horario.hora_fin = e.hora_fin;
    },
    //CIERRA EL MODAL
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
