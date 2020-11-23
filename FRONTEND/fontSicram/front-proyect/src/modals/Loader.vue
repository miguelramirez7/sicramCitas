<template>
  <v-overlay :value="load" light overlay-opacity="1">
    <v-progress-circular
      :size="100"
      :width="7"
      color="teal"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: "Loader",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    load() {
      return this.dialog;
    },
  },
};
</script>

<style></style>
