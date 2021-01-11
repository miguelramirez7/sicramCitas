<template>
<div class="">
  <menu-org></menu-org>

  <component  v-bind:is="getComponenteOrganizacion"></component>
</div>
  

  
</template>

<script>
import { mapGetters } from 'vuex'
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
        TusDoctoresOrg
    },
    computed:{
      ...mapGetters(['getComponenteOrganizacion'])
    }
}
</script>

<style>

</style>