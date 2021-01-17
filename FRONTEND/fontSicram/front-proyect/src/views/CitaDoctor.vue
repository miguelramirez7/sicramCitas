<template>
  <div>
      <template>
      <v-app-bar app dark color="teal lighten-2" :collapse="!collapseOnScroll">
        <v-app-bar-nav-icon @click="collapseOnScroll = !collapseOnScroll"></v-app-bar-nav-icon>
        <v-toolbar-title>SICRAM - Consulta Médica Virtual </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>
        <vista-cita-doctor/>

    </template>
  </div>
</template>

<script>
import VistaCitaDoctor from '../components/dashboards/Doctor/VistaCitaDoctor.vue'
import { mapActions } from 'vuex'
export default {
  components: { VistaCitaDoctor },
    name: "CitaDoctor",
    data(){
        return{
            collapseOnScroll : true,
        }
    },
    methods:{
      ...mapActions(['read_idCita'])
    },
    created(){
      this.read_idCita()
    }
}
</script>

<style>

</style>