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
      ><h3 class="titulo-perfil-pac">REGISTRAR DOCTOR</h3></v-card-title
    >
    <v-card-text class="letra-modal-actualizar">
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="registrarDoctor()"
      >
        <v-container>
            <v-row dense>
              <v-col cols="12" sm="6" md="6" class="">
                <v-text-field
                  label="Nombres*"
                  dense
                  solo
                  required
                  color="cyan"
                  :rules="[getReglas.requerido,getReglas.maxCharacters,getReglas.onlyLetters]"
                  v-model="doctorDatos.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Apellidos*"
                  dense
                  solo
                  required
                  color="cyan"
                  :rules="[getReglas.requerido,getReglas.maxCharacters,getReglas.onlyLetters]"
                  v-model="doctorDatos.lastname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Correo*"
                  dense
                  solo
                  required
                  color="cyan"
                  :rules="[getReglas.requerido, getReglas.correo,getReglas.maxCharacters]"
                  v-model="doctorDatos.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Contraseña*"
                  dense
                  solo
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  required
                  color="cyan"
                  :rules="[
                    getReglas.requerido,
                    getReglas.pass,
                    getReglas.minimochar,
                    getReglas.maxCharacters
                  ]"
                  @click:append="show1 = !show1"
                  v-model="doctorDatos.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                type="number"
                  label="DNI*"
                  dense
                  solo
                  required
                  color="cyan"
                  :rules="[getReglas.requerido, getReglas.DNI]"
                  v-model="doctorDatos.dni"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['MASCULINO', 'FEMENINO']"
                  label="Género*"
                  dense
                  solo
                  required
                  color="cyan"                  
                  :rules="[getReglas.requerido]"
                  v-model="doctorDatos.genero"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="CMP*"
                  dense
                  solo
                  required   
                  color="cyan"
                  :rules="[getReglas.requerido]"
                  v-model="doctorDatos.cmp"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="getEspecialidades"
                  item-text="especialidad"
                  dense
                  solo
                  label="Especialidad*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido]"
                  v-model="doctorDatos.especialidad"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Edad*"
                  type="number"
                  dense
                  solo
                  required
                  color="cyan"
                  :rules="[getReglas.requerido,getReglas.edad]"
                  v-model="doctorDatos.edad"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Número de celular"
                  color="cyan"
                  type="number"
                  dense
                  solo
                  :rules="[
                    getReglas.requerido,
                    getReglas.numCelular,
                    getReglas.celular,
                  ]"
                  v-model="doctorDatos.celular"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
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
    </v-card-text>
  </v-card>
</template>

<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "AgregarDoctorOrg",
  components: {
    Loader,
    Alert,
  },
  data() {
    return {
      show1: false, //MOSTRAR CONTRASEÑA
      showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
      showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
      doctorDatos: {
        //DATOS DEL DOCTOR A REGISTRAR
        password: "",
        email: "",
        name: "",
        lastname: "",
        genero: "",
        dni: "",
        edad: "",
        celular: "",
        cmp: "",
        profesion: "DOCTOR",
        especialidad: "",
      },
    };
  },

  computed: {
    ...mapGetters(["getReglas", "getAlert", "getUsuario","getEspecialidades"]),
  },
  methods: {
    ...mapActions(["registrarDoctorOrga"]),
    registrarDoctor() {
      if (this.$refs.form.validate()) {
        console.log(this.doctorDatos);
        const datos = {
          newDoctor: this.doctorDatos,
          organizacion: this.getUsuario,
        };
        this.showLoader = true;
        this.registrarDoctorOrga(datos).then((res) => {
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
