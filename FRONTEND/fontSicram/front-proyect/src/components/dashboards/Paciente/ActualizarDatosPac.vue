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
                  v-model="getPacientePerfil.genero"
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
                  v-model="getPacientePerfil.celular"
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
                  v-model="getPacientePerfil.edad"
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
    };
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
.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  padding: 0;
}

.subtitulo {
  font-size: 16px;
}
.titulo {
  font-size: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  background: #f2f2f2;
  color: rgb(0, 92, 128);
}
</style>
