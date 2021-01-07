<template>
  <div>
    <!----CARGADOR---->
    <Loader :dialog="showLoader" />
    <!----ALERTA---->
    <Alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="alerta.mensajeAlerta"
      :tipo="alerta.tipoAlerta"
    />
    <v-row>
      <v-col cols="12" sm="4">
        <v-card class="pa-2" tile height="480">
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-col cols="12" sm="12">
                <h3>Nueva Cita</h3>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  append-outer-icon="mdi-account-box-multiple"
                  :items="['Titular', 'Dependiente']"
                  label="Tipo de Paciente*"
                  v-model="newCita.tipoPaciente"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido]"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  append-outer-icon="mdi-account-box-multiple"
                  :items="dependientes"
                  return-object
                  :item-text="(item) => item.name + '  ' + item.lastname"
                  label="Paciente Dependiente*"
                  :disabled="pacientesDependientes"
                  color="cyan"
                  v-model="newCita.dependiente"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  :items="especialidades"
                  item-text="especialidad"
                  append-outer-icon="mdi-book-account-outline"
                  label="Especialidad*"
                  required
                  color="cyan"
                  @change="changeListaDoctores"
                  :rules="[getReglas.requerido]"
                  v-model="newCita.especialidad"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  :items="doctores"
                  item-text="lastname"
                  return-object
                  label="Doctor*"
                  @change="changeHorariosDoctor"
                  required
                  color="cyan"
                  append-outer-icon="mdi-doctor"
                  :rules="[getReglas.requerido]"
                  v-model="newCita.doctor"
                ></v-select>
              </v-col>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card class="pa-2" tile height="480">
          <HorarioDoctor
            :dataTime="listaHorarios"
            :doctor="newCita.doctor"
            :dataCita="newCita"
            @recargarHorario="changeHorariosDoctor"
            ref="componenteHijo"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card class="pa-2" tile>
          <CitasPendientesPacCalendar
            :paciente="{
              tipoPaciente: 'titular',
              datos: null,
              vista: 'nuevaCita'
            }"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import { mapActions, mapGetters } from "vuex";
import CitasPendientesPacCalendar from "./CitasPendientesPacCalendar.vue";
import HorarioDoctor from "./HorarioDoctor.vue";
export default {
  name: "NuevaCitaPac",
  components: {
    CitasPendientesPacCalendar,
    HorarioDoctor,
    Loader,
    Alert,
  },
  data() {
    return {
      showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
      showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
      listaDoctores : null, //MUESTRA LA LISTA DE DOCTORES
      alerta: { //VARIABLE PARA EL TIPO Y EL MENSAJE DE ALERTA
        mensajeAlerta: "",
        tipoAlerta: "",
      },
      newCita: { //VARIABLE PARA SELECCIONAR EL TIPO DE CITA A REGISTRAR
        tipoPaciente: "",
        dependiente: "",
        especialidad: "",
        doctor: {
          name: "Nombre",
          lastname: "Apellido",
        },
      },
      listaHorarios: [], // LISTA LOS HORARIOS DEL DOCTOR SELECCIONADO
    };
  },

  computed: {
    ...mapGetters([
      "getReglas", 
      "getEspecialidades",
      "getListaDoctoresPorEspecialidad",
      "getHorariosDesocupados",
      "getListaDependientes",
      "getUsuario",
    ]),

    //PARA SELECCIONAR EL TIPO DE PACIENTE AL QUE SE QUIERE PONER LA CITA
    pacientesDependientes() {
      if (this.newCita.tipoPaciente === "Dependiente") return false;
      return true;
    },

    //LISTA DE ESPECIALIDADES
    especialidades() {
      if (this.getEspecialidades == null) return [];
      else return this.getEspecialidades;
    },

    //LISTA DE DOCTORES POR ESPECIALIDAD
    doctores() {
      if (this.getListaDoctoresPorEspecialidad == null) return [];
      else return this.getListaDoctoresPorEspecialidad;
    },

    //LISTA DE DEPENDIENTES
    dependientes() {
      if (this.getListaDependientes == null) return [];
      else return this.getListaDependientes;
    },
  },

  methods: {
    ...mapActions([
      "listaEspecialidades",
      "listarDoctoresPorEspecialidad",
      "listarHorariosDoctor",
      "listarDependientes",
    ]),

    //CAMBIA LA LISTA DE LOS DOCTORES
    changeListaDoctores() {
      //this.listaDoctores = null;
      this.listarDoctoresPorEspecialidad(this.newCita.especialidad);
      console.log(this.getListaDoctoresPorEspecialidad);
      
    },

    //CAMBIA A UNA LISTA DE LOS HORARIOS DEL DOCTOR
    changeHorariosDoctor() {
      console.log("la nueva cita es para", this.newCita);
      console.log("EL DOCTOR: ", this.newCita.doctor);
      this.listaHorarios = null;
      this.listarHorariosDoctor({ id: this.newCita.doctor._id }).then((res) => {
        this.listaHorarios = this.getHorariosDesocupados;
        if (this.listaHorarios === null) {
          this.alerta.mensajeAlerta =
            "El doctor ya no cuenta con horarios disponibles.";
          this.alerta.tipoAlerta = "warning";
          this.showAlert = true;
        }
        console.log("ACTIVAR HORARIOS DOCTOR");
        this.$refs.componenteHijo.updateRange;
      });
    },
  },

  created() {
    this.listaEspecialidades();
    this.listarDependientes(this.getUsuario);
  },
};
</script>

<style></style>
