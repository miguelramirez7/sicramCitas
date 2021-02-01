<template>
<div class="">
  <loader :dialog="mostrarLoader" />
  <menu-org></menu-org>

  <component  v-bind:is="getComponenteOrganizacion"></component>
</div>
  

  
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from "../modals/Loader.vue";

import MenuOrg from './../components/MenuOrg'
import InicioOrganizacion from './../components/dashboards/Organizacion/InicioOrganizacion.vue'
import TuPerfilOrg from './../components/dashboards/Organizacion/TuPerfilOrg.vue'
import ActualizarDatosOrg from './../components/dashboards/Organizacion/ActualizarDatosOrg.vue'
import AgregarDoctorOrg from './../components/dashboards/Organizacion/AgregarDoctorOrg.vue'
import TusDoctoresOrg from './../components/dashboards/Organizacion/TusDoctoresOrg.vue'

export default {
    name: 'OrganizacionSistema',
    components:{
        MenuOrg,
        InicioOrganizacion,
        TuPerfilOrg,
        ActualizarDatosOrg,
        AgregarDoctorOrg,
        TusDoctoresOrg,
        Loader
    },
    computed:{
      ...mapGetters(['getComponenteOrganizacion',"getOrganizacionPerfil"]),
      mostrarLoader() {
      if (this.getOrganizacionPerfil === null) return true;
      else return false;
    },
    }
}
</script>

<style> 

</style>