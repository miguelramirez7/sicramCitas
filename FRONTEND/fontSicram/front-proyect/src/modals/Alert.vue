<template>
  <v-dialog
    :value="alert"
    persistent
    no-click-animation
    width="300"
    overlay-opacity="0"
  >
    <v-card v-click-outside="false">
      <v-alert :type="tipo" prominent class="ma-0">{{ mensaje }}</v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Alert",
  props: {
    //VARIABLE PARA MOSTRAR LA ALERTA
    dialog: {
      type: Boolean,
      default: false,
    },
    //EL TIPO DE ALERTA SUCCESS, INFO, ERROR
    tipo: {
      type: String,
      default: "success",
    },
    //EL MENSAJE DENTRO DE LA ALERTA
    mensaje: {
      type: String,
      default: "La acción ha sido realizada con éxito.",
    },
  },
  computed: {
    alert() {
      //PREGUNTA SI EL MODAL ESTA ABIERTO PARA CERRARLO DESPUES DE 1 SEGUNDO.
      if (this.dialog == true) {
        setTimeout(() => {
          this.$emit("close");
        }, 1000);
      }
      return this.dialog;
    },
  },
};
</script>

<style></style>
