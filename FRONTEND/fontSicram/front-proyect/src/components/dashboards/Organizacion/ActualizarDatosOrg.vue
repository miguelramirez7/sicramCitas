<template>
  <v-card class=" mt-1" >
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
    <v-container  class="letra-modal-actualizar">
      <v-form ref="form" lazy-validation @submit.prevent="actualizarPerfil">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
               NombreOrg:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  disabled
                  outlined
                  class="input1"
                  v-model="getOrganizacionPerfil.nameOrg"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                Email:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  disabled
                  outlined
                  v-model="getOrganizacionPerfil.email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                Dirección:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  :rules="[getReglas.requerido]"
                  class="input1"
                  v-model="getOrganizacionPerfil.direccion"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                RUC:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  disabled
                  :rules="[getReglas.requerido]"
                  class="input1"
                  v-model="getOrganizacionPerfil.ruc"
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
  name: "ActualizarDatosOrg",
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
    this.datos = this.getOrganizacionPerfil
  },
  computed: {
    ...mapGetters(["getOrganizacionPerfil", "getReglas", "getAlert", "getUsuario"]),
  },
  methods: {
    ...mapActions(["actualizarOrganizacion"]),
    actualizarPerfil() {
      const data = {
        direccion: this.getOrganizacionPerfil.direccion,
        email: this.getOrganizacionPerfil.email,
        nameOrg: this.getOrganizacionPerfil.nameOrg,
      };
      console.log(data)
      if (this.$refs.form.validate()) {
        this.showLoader = true;
        this.actualizarOrganizacion({
          newDatos: data,
          organizacion: this.getUsuario,
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
