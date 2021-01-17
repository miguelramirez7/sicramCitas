<template>
  <v-card class=" mt-1">
    <!----CARGADOR---->
    <Loader :dialog="showLoader" />
    <!----ALERTA---->
    <Alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    />
    <v-card-title
      ><h3 class="titulo-perfil-pac">REGISTRAR DEPENDIENTE</h3></v-card-title
    >
    <v-container class="letra-modal-actualizar">
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="registrarDepeniente()"
      >
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                Nombre:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  :rules="[getReglas.requerido]"
                  v-model="dependiente.name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                Apellido:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  :rules="[getReglas.requerido]"
                  v-model="dependiente.lastname"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                DNI:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  type="number"
                  dense
                  outlined
                  :rules="[getReglas.requerido, getReglas.DNI]"
                  v-model="dependiente.dni"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
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
                  v-model="dependiente.genero"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
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
                  v-model="dependiente.celular"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                Edad:
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  type="number"
                  :rules="[getReglas.requerido]"
                  v-model="dependiente.edad"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn
            color="orange darken-2 mb-5"
            elevation="8"
            x-large
            type="submit"
            dark
          >
            Registrar
            <v-icon class="ml-1">
              mdi-account-plus
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
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "RegistrarFamiliar",
  components: {
    Loader,
    Alert,
  },
  data() {
    return {
      ...mapState(["dependiente, dependientes"]),
      showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
      showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
      datos: null,
      dependiente: {
        name: "",
        lastname: "",
        email: "email1@email.com", //
        genero: "",
        edad: "",
        discapacidad: "ninguna", //
        celular: "",
        direccion: "ninguna", //
        dni: "",
      },
    };
  },

  computed: {
    ...mapGetters(["getReglas", "getAlert", "getUsuario"]),
  },
  methods: {
    ...mapActions(["registrarFamiliar"]),
    registrarDepeniente() {
      if (this.$refs.form.validate()) {
        console.log(this.dependiente);
        const datos = {
          dependiente: this.dependiente,
          paciente: this.getUsuario,
        };
        this.showLoader = true;
        this.registrarFamiliar(datos).then((res) => {
          this.showLoader = false;
          this.showAlert = true;
        });
      } else {
        console.log("no valido");
      }
    },
  },
};
</script>

<style scoped>
.titulo-perfil-pac {
  color: teal;
}
.letra-modal-actualizar {
  font-size: 16px;
  text-transform: uppercase;
  color: black;
}
</style>
