<template>
  <v-dialog :value="edit" max-width="800px" persistent>
    <!----CARGADOR---->
    <Loader :dialog="showLoader" />
    <!----ALERTA---->
    <Alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    />
    <!----PREGUNTA---->
    <!----PREGUNTA---->
    <Questioner
      :dialog="showQuestion"
      @close="showQuestion = false"
      @accept="editarHorario()"
      :title="mensajeEliminar.titulo"
      :message="mensajeEliminar.mensaje"
    />

    <v-card>
      <v-form ref="form" lazy-validation @submit.prevent="editar">
        <v-container fluid>
          <v-card-title class="titulo"> Editar Horario </v-card-title>
          <v-card-text>
            <v-row no-gutters>
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
              <v-col cols="12" md="3">
                <div class="text-center">
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        large
                        v-bind="attrs"
                        v-on="on"
                        elevation="7"
                        color="green"
                        type="submit"
                        dark
                        >Editar 
                         <v-icon class="ml-1" >
                        mdi-pencil
                      </v-icon></v-btn
                      >
                    </template>
                    <span>Editar Horario</span>
                  </v-tooltip>
                </div>
              </v-col>
              <v-col cols="12" md="1">
                <div class="text-center">
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        large
                        v-bind="attrs"
                        v-on="on"
                        elevation="7"
                        color="red"
                        @click="close"
                        dark
                        > 
                         <v-icon class="ml-1" >
                        mdi-close
                      </v-icon></v-btn
                      >
                    </template>
                    <span>CERRAR</span>
                  </v-tooltip>
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
import Questioner from "@/modals/Questioner.vue";
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditarHorarioDoctorMod",
  components: {
    Loader,
    Alert,
    Questioner,
  },
  props: {
    //VARIABLE PARA MOSTRAR EL MODAL DE EDITAR
    dial: {
      type: Boolean,
      default: false,
    },
    //VARIABLE PARA EL ELEMENTO A EDITAR
    element: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      mensajeEliminar: {
        titulo: "Modificar Horario.",
        mensaje: "¿Está seguro que desea modificar este horario?",
      },
      showQuestion: false, //MUESTRA LA PREGUNTA DE ACEPTAR
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
      return this.dial;
    },
  },
  methods: {
    ...mapActions(["modificarHorario", "listarHorariosDoctor"]),
    //MODIFICA EL HORARIO DEL DOCTOR
    editar() {
      if (this.$refs.form.validate()) {
        this.showQuestion = true;
      }
    },
    editarHorario() {
      (this.showQuestion = false), (this.showLoader = true);
      console.log(this.element);
      let datos = {
        newHorario: {
          fecha: this.date,
          hora_inicio: this.horario.hora_inicio,
          hora_fin: this.horario.hora_fin,
          horario_id: this.element._id,
        },
        doctor: this.getUsuario,
      };
      this.modificarHorario(datos).then((res) => {
        this.showLoader = false;
        this.showAlert = true;
        if (res) {
          this.listarHorariosDoctor(this.getUsuario);
          this.close();
        }
      });
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
