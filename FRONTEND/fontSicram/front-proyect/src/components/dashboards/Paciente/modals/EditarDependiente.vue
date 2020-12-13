<template>
    <div class="">
        <v-dialog
      :value="edit"
      persistent
      max-width="600px"
    >
    <v-row justify="center">
    <v-card class="carta">
    <!----CARGADOR---->
    <Loader :dialog="showLoader" />
    
    <Alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    /> 
    <v-card-title class="titulo">Actualizar Dependiente</v-card-title>
    <v-container style="text-transform: uppercase;">
      <v-form ref="form" lazy-validation @submit.prevent="">
        <v-row>
          <v-col cols="12" >
            <v-row>
              <v-col md="4" class="ml-5" >
                <v-card-text class=" subtitulo">Nombre:</v-card-text>
              </v-col>
              <v-col md="6" class="mr-1">
                <v-text-field
                  dense
                  outlined
                  class="input1"
                  disabled
                  v-model="datos.name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" >
            <v-row>
              <v-col md="4"  class="ml-5">
                <v-card-text class="subtitulo">Apellido:</v-card-text>
              </v-col>
              <v-col md="6" class="mr-1" >
                <v-text-field
                  dense
                  disabled
                  outlined
                 v-model="datos.lastname"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col md="4" class="ml-5">
                <v-card-text class=" subtitulo">DNI:</v-card-text>
              </v-col>
              <v-col md="6" class="mr-1">
                <v-text-field
                  dense
                  outlined
                  disabled
                  class="input1"
                 v-model="datos.dni"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" >
            <v-row>
              <v-col md="4" class="ml-5">
                <v-card-text class="subtitulo">Género:</v-card-text>
              </v-col>
              <v-col md="6" class="mr-1">
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
          <v-col cols="12" >
            <v-row>
              <v-col md="4" class="ml-5">
                <v-card-text class=" subtitulo">Celular:</v-card-text>
              </v-col>
              <v-col md="6" class="mr-1">
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
          <v-col cols="12" >
            <v-row>
              <v-col md="4" class="ml-5">
                <v-card-text class="subtitulo">Edad:</v-card-text>
              </v-col>
              <v-col md="6" class="mr-1">
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
          <v-btn color="teal mt-5 mr-5"  elevation="8" x-sm type="submit">
            Actualizar
          </v-btn>
          <v-btn color="red lighten-1 mt-5 ml-5" @click="close" elevation="8" x-sm type="submit">
            Cerrar
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>

    
      </v-row>
    </v-dialog>
    </div>
    
  
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loader from '@/modals/Loader.vue'
import Alert from '@/modals/Alert.vue'
  export default {
      name: 'EditarDependiente',
    data: () => ({
    showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
      showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
    }),
    components:{
        Loader,
        Alert
    },
    props:{
        dialog:{
            type: Boolean,
            default : false
        },
        datos:{
            type:Object,
            default:{
                name: 'jogito',       
                lastname: 'nuñez',
                email:'email1@email.com',    //
                genero: '',
                edad: '',
                discapacidad:'ninguna',   //
                celular:'',
                direccion: 'ninguna',  //
                dni: '',
            }
        }
    },
    computed:{
        ...mapGetters([ "getReglas", "getAlert"]),
        edit(){
            return this.dialog
        }
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
  }
</script>

<style scoped>
    @import '../../../../assets/css/listarDependiente.css';

</style>