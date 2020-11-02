<template>
  <v-app>
    <vista-sidebar-paciente/>
  </v-app>
</template>

<script>
import VistaSidebarPaciente from './components/VistaSidebarPaciente.vue';

export default {
  name: 'App',

  components: {
    VistaSidebarPaciente,
  },

  data: () => ({
    //
  }),
};
</script>
