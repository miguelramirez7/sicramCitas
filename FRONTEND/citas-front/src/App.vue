<template>
  <v-app>
    <vista-home/>
  </v-app>
</template>

<script>
import VistaHome from './components/VistaHome';

export default {
  name: 'App',

  components: {
    VistaHome,
  },

  data: () => ({
    //
  }),
};
</script>
