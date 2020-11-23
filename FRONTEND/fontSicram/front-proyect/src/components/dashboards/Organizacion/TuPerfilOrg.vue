<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <v-card content-class="carta-perfil" class="mt-5">

            <div class="imagen-card">
              <img src="../../../assets/organizacion.svg" alt="John" />
            </div>


            <v-card-title class="titulo2">NOMBRE COMPLETO</v-card-title>
            <v-card-subtitle class="text-center">
              Doctor
            </v-card-subtitle>
          </v-card>

        </v-col>
        <v-col cols="12" md="6">
          
            
              <div class="mt-5">
                <v-row justify="center">
                  <v-expansion-panels accordion>
                    <v-expansion-panel value="true">
                      <v-expansion-panel-header class="titulo">Información </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-simple-table>
                          <template v-slot:default>
                            <tbody>
                              <tr v-for="item in infoPersonal" :key="item.name">
                                <td>
                                  <v-icon small class="mr-2" v-text="item.icon"></v-icon>{{ item.name }}
                                </td>
                                <td>{{ item.calories }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                   
                  </v-expansion-panels>
                </v-row>
              </div>
            

          
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  export default {
    name: 'TuPerfilDoc',
    computed: {
      ...mapGetters(['getDoctorPerfil'])
    },
    data() {
      return {
        infoPersonal: [{
            name: 'NOMBRES Y APELLIDOS',
            calories: '-----',
            icon: 'mdi-rename-box'
          },
          {
            name: 'DNI',
            calories: 237,
            icon: 'mdi-credit-card'
          },
          {
            name: 'EDAD',
            calories: 262,
            icon: 'mdi-clock'
          },
          {
            name: 'TELEFONO',
            calories: 305,
            icon: 'mdi-card-account-phone'
          },
          {
            name: 'CELULAR',
            calories: 356,
            icon: 'mdi-cellphone'
          },
          {
            name: 'CORREO',
            calories: 375,
            icon: 'mdi-email'
          },
          {
            name: 'GENERO',
            calories: 392,
            icon: 'mdi-gender-male-female-variant'
          },
        ],
        infoProfesional: [{
            name: 'ESPECIALIDAD',
            calories: 'Pediatra',
            icon: 'mdi-school'
          },
          {
            name: 'CMP',
            calories: 237,
            icon: 'mdi-tag'
          },
          
          
        ],
      }
    }


  };
</script>

 <style  scoped>
 
@import "../../../assets/css/orga.css";
 </style>