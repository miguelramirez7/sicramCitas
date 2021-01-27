<template>
  <v-card >
    <!----CARGADOR---->
    <Loader :dialog="showLoader" />
    <!----ALERTA---->
    <Alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    />
    <v-card-title ><h3 class="titulo-perfil-pac">ACTUALIZAR DATOS</h3></v-card-title>
    <v-container class="letra-modal-actualizar">
      <v-form ref="form" lazy-validation @submit.prevent="actualizarPerfil">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-row no-gutters>
              <v-col md="3" class="ml-5">
                Nombre:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  disabled
                  outlined
                  class="input1"
                  :value="getDoctorPerfil.name.toUpperCase()"
                  @input="
                    getDoctorPerfil.name = $event.target.value.toUpperCase()
                  "
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row no-gutters>
              <v-col md="3" class="ml-5">
                Apellido:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  disabled
                  outlined
                  :value="getDoctorPerfil.lastname.toUpperCase()"
                  @input="
                    getDoctorPerfil.lastname = $event.target.value.toUpperCase()
                  "
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row no-gutters>
              <v-col md="3" class="ml-5">
                DNI:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  disabled
                  class="input1"
                  v-model="getDoctorPerfil.dni"
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
                  class="input1"
                  disabled
                  :rules="[getReglas.requerido]"
                  v-model="getDoctorPerfil.genero"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row no-gutters>
              <v-col md="3" class="ml-5">
                Celular:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  class="input1"
                  type="number"
                  :rules="[getReglas.requerido,getReglas.celular,getReglas.numCelular]"
                  v-model="getDoctorPerfil.celular"
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
                  :rules="[getReglas.requerido,getReglas.edad]"
                  v-model="getDoctorPerfil.edad"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row no-gutters>
              <v-col md="3" class="ml-5">
                CMP:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  class="input1"
                  type="number"
                  disabled
                  :rules="[getReglas.requerido]"
                  v-model="getDoctorPerfil.cmp"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row no-gutters>
              <v-col md="3" class="ml-5">
               Especialidad:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  disabled
                  type="text"
                  :rules="[getReglas.requerido]"
                  v-model="getDoctorPerfil.especialidad.especialidad"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="text-center">
           <v-btn color="orange darken-2 mb-5" elevation="8" x-large type="submit" dark >
            Actualizar
            <v-icon class="ml-1">
              mdi-account-edit
            </v-icon>
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
  name: "ActualizarPerfilDoc",
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
    ...mapGetters(["getDoctorPerfil", "getReglas", "getAlert", "getUsuario"]),
  },
  methods: {
    ...mapActions(["actualizarDoctor"]),
    actualizarPerfil() {
      const data = {
        edad: this.getDoctorPerfil.edad,
        email: this.getDoctorPerfil.email,
        celular: this.getDoctorPerfil.celular,
        especialidad: this.getDoctorPerfil.especialidad.especialidad
      };
      console.log(data)
      if (this.$refs.form.validate()) {
        this.showLoader = true;
        this.actualizarDoctor({
          newDatos: data,
          doctor: this.getUsuario,
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
.titulo-perfil-pac {
  color: teal;
}
.letra-modal-actualizar{
  font-size: 16px;
  text-transform: uppercase;
  color: black;
}
</style>
