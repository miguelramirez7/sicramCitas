<template>
<div >
  <menu-doctor></menu-doctor>
  <component v-bind:is="getComponenteDoctor"></component>
</div>
  
</template>

<script>

import MenuDoctor from './../components/MenuDoctor'
import InicioDoctor from './../components/dashboards/Doctor/InicioDoctor.vue'
import TuPerfilDoc from './../components/dashboards/Doctor/TuPerfilDoc.vue'
import ActualizarPerfilDoc from './../components/dashboards/Doctor/ActualizarPerfilDoc.vue'
import AgregarHorarioDoc from './../components/dashboards/Doctor/AgregarHorarioDoc.vue'
import HistorialHorarioDoc from './../components/dashboards/Doctor/HistorialHorarioDoc.vue'
import CitasPendientesDoc from './../components/dashboards/Doctor/CitasPendientesDoc.vue'
import CitasPasadasDoc from './../components/dashboards/Doctor/CitasPasadasDoc.vue'


import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    name:"DoctorSistema",
    data(){
      return{
        
      }
    },
    components: {
        MenuDoctor,
        InicioDoctor,
        TuPerfilDoc,
        ActualizarPerfilDoc,
        AgregarHorarioDoc,
        HistorialHorarioDoc,
        CitasPendientesDoc,
        CitasPasadasDoc
    },
    computed:{
      ...mapGetters(['getComponenteDoctor'])
    }
    
}
</script>

<style scoped>

</style>