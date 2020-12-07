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
    <v-card-title class="titulo">Registrar Dependiente</v-card-title>
    <v-container style="text-transform: uppercase;">
      <v-form ref="form" lazy-validation @submit.prevent="registrarDepeniente()">
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col md="3" class="ml-5">
                <v-card-text class=" subtitulo">Nombre:</v-card-text>
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
                <v-card-text class="subtitulo">Apellido:</v-card-text>
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
                <v-card-text class=" subtitulo">DNI:</v-card-text>
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                type="number"
                  dense
                  outlined
                 :rules="[getReglas.requerido,getReglas.DNI]"
                 v-model="dependiente.dni"
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
                <v-card-text class=" subtitulo">Celular:</v-card-text>
              </v-col>
              <v-col md="7" class="mr-5">
                <v-text-field
                  dense
                  outlined
                  type="number"
                  :rules="[getReglas.requerido,getReglas.numCelular,getReglas.celular]"
                  v-model="dependiente.celular"
                  
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
                 v-model="dependiente.edad"

                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn color="teal mt-5" rounded elevation="8" x-large type="submit">
            Registrar
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import { mapActions, mapState, mapGetters} from "vuex";
export default {
  name: "RegistrarFamiliar",
  components: {
    Loader,
    Alert,
  },
  data() {
    return {
        ...mapState(['dependiente, dependientes']),
      showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
      showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
      datos: null,
      dependiente:{
          name: '',       
          lastname: '',
          email:'email@email.com',    //
          genero: '',
          edad: '',
          discapacidad:'ninguna',   //
          celular:'',
          direccion: 'ninguna',  //
          dni: '',
      }
    };
  },

  computed: {
    ...mapGetters( ["getReglas", "getAlert", "getUsuario"]),
  },
  methods: {
      ...mapActions(['registrarFamiliar']),
    registrarDepeniente(){
      if (this.$refs.form.validate()){
       console.log(this.dependiente);
       const datos = {
           dependiente : this.dependiente,
           paciente : this.getUsuario
       }
       this.showLoader = true
       this.registrarFamiliar(datos)
       .then(res => {
           this.showLoader = false
           this.showAlert = true
       })
      }else{
          console.log('no valido');
      }
    },
  },
};
</script>

<style scoped>
    @import "../../../assets/css/paciente.css";
</style>