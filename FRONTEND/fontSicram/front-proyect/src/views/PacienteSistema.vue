<template>
  <div>
    <loader :dialog="mostrarLoader" />
    <menu-paciente></menu-paciente>
    <component v-bind:is="getComponentePaciente"></component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "../modals/Loader.vue";

import MenuPaciente from "./../components/MenuPaciente";
import InicioPaciente from "./../components/dashboards/Paciente/InicioPaciente.vue";
import TuPerfilPac from "./../components/dashboards/Paciente/TuPerfilPac.vue";
import ActualizarDatosPac from "./../components/dashboards/Paciente/ActualizarDatosPac.vue";
import RegistrarFamiliarPac from "./../components/dashboards/Paciente/RegistrarFamiliarPac.vue";
import ListarFamiliaresPac from "./../components/dashboards/Paciente/ListarFamiliaresPac.vue";
import NuevaCitaPac from "./../components/dashboards/Paciente/NuevaCitaPac.vue";
import CitasPendientesPac from "./../components/dashboards/Paciente/CitasPendientesPac.vue";
import HistorialPac from "./../components/dashboards/Paciente/HistorialPac.vue";

export default {
  name: "PacienteSistema",
  components: {
    MenuPaciente,
    InicioPaciente,
    TuPerfilPac,
    ActualizarDatosPac,
    RegistrarFamiliarPac,
    ListarFamiliaresPac,
    NuevaCitaPac,
    CitasPendientesPac,
    HistorialPac,
    Loader,
  },
  computed: {
    ...mapGetters(["getComponentePaciente", "getPacientePerfil"]),
    mostrarLoader() {
      if (this.getPacientePerfil === null) return true;
      else return false;
    },
  },
};
</script>

<style></style>
