<template>
  <v-card class="carta">
    <!----CARGADOR---->
    <Loader :dialog="showLoader" />
    <!----ALERTA---->
    <Alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    />
    <v-card-title class="titulo">Actualizar Datos</v-card-title>
    <v-container style="text-transform: uppercase;">
      <v-form ref="form" lazy-validation @submit.prevent="actualizarPerfil">
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                <v-card-text class=" subtitulo">Nombre:</v-card-text>
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  disabled
                  outlined
                  class="input1"
                  :value="getPacientePerfil.name.toUpperCase()"
                  @input="
                    getPacientePerfil.name = $event.target.value.toUpperCase()
                  "
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                <v-card-text class="subtitulo">Apellido:</v-card-text>
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  disabled
                  outlined
                  :value="getPacientePerfil.lastname.toUpperCase()"
                  @input="
                    getPacientePerfil.lastname = $event.target.value.toUpperCase()
                  "
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                <v-card-text class=" subtitulo">DNI:</v-card-text>
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  disabled
                  class="input1"
                  v-model="getPacientePerfil.dni"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                <v-card-text class="subtitulo">Género:</v-card-text>
              </v-col>
              <v-col md="7" class="mr-5">
                <v-select
                  dense
                  :items="['MASCULINO', 'FEMENINO']"
                  outlined
                  required
                  class="input1"
                  :rules="[getReglas.requerido]"
                  v-model="datos.genero"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                <v-card-text class=" subtitulo">Celular:</v-card-text>
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  class="input1"
                  type="number"
                  :rules="[getReglas.requerido]"
                  v-model="datos.celular"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                <v-card-text class="subtitulo">Edad:</v-card-text>
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
          <v-btn color="teal mt-5" rounded elevation="8" x-large type="submit">
            Actualizar
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ActualizarDatosPac",
  components: {
    Loader,
    Alert,
  },
  data() {
    return {
      showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
      showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
      datos: null,
    };
  },
  created (){
    this.datos = this.getPacientePerfil
  },
  computed: {
    ...mapGetters(["getPacientePerfil", "getReglas", "getAlert", "getUsuario"]),
  },
  methods: {
    ...mapActions(["actualizarPaciente"]),
    actualizarPerfil() {
      const data = {
        edad: this.getPacientePerfil.edad,
        email: this.getPacientePerfil.email,
        celular: this.getPacientePerfil.celular,
      };
      console.log(data)
      if (this.$refs.form.validate()) {
        this.showLoader = true;
        this.actualizarPaciente({
          newDatos: data,
          paciente: this.getUsuario,
        }).then((res) => {
          this.showLoader = false;
          this.showAlert = true;
        });
      }
    },
  },
};
</script>

<style scoped>
@import "../../../assets/css/formPaciente.css";


</style>
