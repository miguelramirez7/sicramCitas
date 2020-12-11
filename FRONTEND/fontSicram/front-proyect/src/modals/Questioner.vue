<template>
  <div>
    <v-dialog :value="question" max-width="600px" persistent>
      <v-card>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>

        <v-card-text>
          <div class="text--primary">
            {{ message }}
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="accept">
            Aceptar
          </v-btn>
          <v-btn color="red lighten-1" text @click="close">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Questioner",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "TITULO",
    },
    message: {
      type: String,
      defauly: "MENSAJasdasdasdsdE",
    },
  },
  computed: {
    question() {
      return this.dialog;
    },
  },
  methods: {
    //CIERRA EL MODAL
    close() { 
      this.$emit("close");
    },
    //EMITIR FUNCION DEL PADRE AL PONER ACEPTAR
    accept() {
      this.$emit("accept");
    },
  },
};
</script>

<style></style>
