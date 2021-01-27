<template>
  <v-dialog :value="firma" max-width="450" persistent>
    <v-card class="pa-0" color="grey lighten-4">
      <v-card-text class="pb-0">
        <v-row>
          <v-col sm="10" md="10">
            <div>
              <vueSignature
                ref="signature"
                :sigOption="option"
                :w="'330px'"
                :h="'150px'"
                :disabled="disabled"
              ></vueSignature>
            </div>
          </v-col>
          <v-col sm="2" md="2" class="text-right">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="close"
                  color="white"
                  fab
                  elevation="5"
                  small
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="red">
                    mdi-close
                  </v-icon>
                </v-btn>
              </template>
              <span >Cerrar</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                class="mt-4"
                  @click="save"
                  color="white"
                  fab
                  elevation="5"
                  small
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="green">
                    mdi-download
                  </v-icon>
                </v-btn>
              </template>
              <span>Descargar</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                 class="mt-4"
                  @click="clear"
                  color="white"
                  fab
                  elevation="5"
                  small
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="blue">
                    mdi-eraser-variant
                  </v-icon>
                </v-btn>
              </template>
              <span>Limpiar</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import vueSignature from "vue-signature";
export default {
  name: "Firma",
  components: {
    vueSignature,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)",
      },
      disabled: false,
    };
  },
  computed: {
    firma() {
      return this.dialog;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      var _this = this;
      var png = _this.$refs.signature.save();
      this.download(png, "firma.jpg");
    },
    clear() {
      var _this = this;
      _this.$refs.signature.clear();
    },
    download(dataURL, filename) {
      if (
        navigator.userAgent.indexOf("Safari") > -1 &&
        navigator.userAgent.indexOf("Chrome") === -1
      ) {
        window.open(dataURL);
      } else {
        var blob = this.dataURLToBlob(dataURL);
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
      }
    },
    dataURLToBlob(dataURL) {
      // Code taken from https://github.com/ebidel/filer.js
      var parts = dataURL.split(";base64,");
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    },
  },
};
</script>

<style lang="scss" scoped>
.firma {
  border: 1px solid black;
}
</style>
