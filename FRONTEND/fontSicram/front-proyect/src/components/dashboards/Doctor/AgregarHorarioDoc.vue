<template>
  <div>
    <!----CARGADOR---->
    <Loader :dialog="showLoader" />
    <!----ALERTA----> 
    <Alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    />
    <v-card class="mb-5">
      <v-form ref="form" lazy-validation @submit.prevent="regitrarHorario">
        <v-container fluid>
         <v-card-title ><h3 class="titulo-perfil-pac">NUEVO HORARIO</h3></v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="pl-4 pr-4" cols="12" md="4">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  color="teal"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Fecha"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      color="teal"
                      :rules="[getReglas.requerido]"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="teal"
                    v-model="date"
                    @input="menu2 = false"
                    :min="date"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="4" class="pl-4 pr-4">
                <v-select
                 color="teal"
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
                <div class="text-center" >
                  <v-btn elevation="7" color="orange darken-1" type="submit" dark x-large
                    >Agregar <v-icon class="ml-1">
                    mdi-alarm-plus
                  </v-icon></v-btn
                  >
                  
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-container>
      </v-form>
    </v-card>
    <ListaHorarioDoc />
  </div>
</template>

<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import { mapActions, mapGetters } from "vuex";
import ListaHorarioDoc from "../../dashboards/Doctor/ListaHorarioDoc.vue";
export default {
  name: "AgregarHorarioDoc",
  components: {
    ListaHorarioDoc,
    Loader,
    Alert,
  },
  data() {
    return {
      showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
      showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      items: [
        { hora: "8:00-9:00", hora_inicio: "8:00", hora_fin: "9:00" },
        { hora: "9:00-10:00", hora_inicio: "9:00", hora_fin: "10:00" },
        { hora: "10:00-11:00", hora_inicio: "10:00", hora_fin: "11:00" },
        { hora: "11:00-12:00", hora_inicio: "11:00", hora_fin: "12:00" },
        { hora: "12:00-13:00", hora_inicio: "12:00", hora_fin: "13:00" },
        { hora: "13:00-14:00", hora_inicio: "13:00", hora_fin: "14:00" },
        { hora: "14:00-15:00", hora_inicio: "14:00", hora_fin: "15:00" },
        { hora: "15:00-16:00", hora_inicio: "15:00", hora_fin: "16:00" },
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
  },
  methods: {
    ...mapActions(["registrarHorarioDoctor"]),
    //REGISTRA EL HORARIO DEL DOCTOR
    regitrarHorario() {
      if (this.$refs.form.validate()) {
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
        console.log("CAMPOS VACIOS");
      }
    },
    //PONE EL HORARIO DE INICIO FIN EN EL OBJETO PARA AGREGAR HORARIOS
    rangoHorario(e) {
      this.horario.hora_inicio = e.hora_inicio;
      this.horario.hora_fin = e.hora_fin;
    },
  },
};
</script>

<style scoped>
.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  padding: 0;
}

.subtitulo {
  font-size: 16px;
}

.titulo-perfil-pac {
  color: teal;
}
</style>
