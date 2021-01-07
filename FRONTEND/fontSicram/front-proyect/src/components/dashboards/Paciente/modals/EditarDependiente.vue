<template>
  <v-dialog :value="edit" persistent max-width="750px">
    <v-card class="carta">
      <!----CARGADOR---->
      <Loader :dialog="showLoader" />

      <Alert
        :dialog="showAlert"
        @close="showAlert = false"
        :mensaje="getAlert.mensajeAlerta"
        :tipo="getAlert.tipoAlerta"
      />
      <v-toolbar color="teal" dark class="pa-0">
        <v-toolbar-title v-html="'ACTUALIZAR DEPENDIENTE'"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="mt-10 letra-modal-actualizar">
        <v-form ref="form" lazy-validation @submit.prevent="editar">
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-row no-gutters>
                <v-col md="3" class="ml-5">
                  Nombre:
                </v-col>
                <v-col md="7" class="mr-5">
                  <v-text-field
                    disabled
                    dense
                    outlined
                    :rules="[getReglas.requerido]"
                    v-model="datos.name"
                  ></v-text-field>
                </v-col>
              </v-row >
            </v-col>
            <v-col cols="12" md="6">
              <v-row no-gutters>
                <v-col md="3" class="ml-5">
                  Apellido:
                </v-col>
                <v-col md="7" class="mr-5">
                  <v-text-field
                    disabled
                    dense
                    outlined
                    :rules="[getReglas.requerido]"
                    v-model="datos.lastname"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row >
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-row no-gutters>
                <v-col md="3" class="ml-5">
                  DNI:
                </v-col>
                <v-col md="7" class="mr-5">
                  <v-text-field
                    disabled
                    type="number"
                    dense
                    outlined
                    :rules="[getReglas.requerido, getReglas.DNI]"
                    v-model="datos.dni"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row no-gutters>
                <v-col md="3" class="ml-5">
                  Género:
                </v-col>
                <v-col md="7" class="mr-5">
                  <v-select
                    dense
                    :items="['MASCULINO', 'FEMENINO']"
                    outlined
                    required
                    :rules="[getReglas.requerido]"
                    v-model="datos.genero"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
          </v-row >
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-row no-gutters>
                <v-col md="3" class="ml-5">
                 Celular:
                </v-col>
                <v-col md="7" class="mr-5">
                  <v-text-field
                    dense
                    outlined
                    type="number"
                    :rules="[
                      getReglas.requerido,
                      getReglas.numCelular,
                      getReglas.celular,
                    ]"
                    v-model="datos.celular"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row no-gutters>
                <v-col md="3" class="ml-5">
                  Edad:
                </v-col>
                <v-col md="7" class="mr-5">
                  <v-text-field
                    dense
                    outlined
                    type="number"
                    :rules="[getReglas.requerido]"
                    v-model="datos.edad"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="text-center">
            <v-btn color="orange darken-2 mb-3" elevation="8" large type="submit" dark >
            Actualizar
            <v-icon class="ml-1">
              mdi-account-edit
            </v-icon>
          </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
export default {
  name: "EditarDependiente",
  data: () => ({
    showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
    showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
  }),
  components: {
    Loader,
    Alert,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    datos: {
      type: Object,
      default: {
        name: "jogito",
        lastname: "nuñez",
        email: "email1@email.com", //
        genero: "",
        edad: "",
        discapacidad: "ninguna", //
        celular: "",
        direccion: "ninguna", //
        dni: "",
      },
    },
  },
  computed: {
    ...mapGetters(["getReglas", "getAlert","getUsuario"]),
    edit() {
      return this.dialog;
    },
  },
  methods: {
    ...mapActions(['editarFamiliar']),
    close() {
      this.$emit("close");
    },
    editar(){
      const dependiente = {
        email: "email1@email.com", //
        edad: this.datos.edad,
        discapacidad: "ninguna", //
        celular:this.datos.celular,
        direccion: "ninguna", //
        id_paciente: this.datos._id
      }
      console.log(this.datos)
      const datos = {
        paciente : this.getUsuario,
        dependiente: dependiente,
      }
      console.log(datos)
      this.editarFamiliar(datos)
    }
  },
};
</script>

<style scoped>
.letra-modal-actualizar{
  font-size: 15px;
  text-transform: uppercase;
  color: black;
}
</style>
