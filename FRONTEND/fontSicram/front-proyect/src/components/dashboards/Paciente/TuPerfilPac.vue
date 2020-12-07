<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <v-card content-class="carta-perfil" class="mt-5">

            <div class="imagen-card">
              <img src="../../../assets/user.svg" alt="John" />
            </div>
 

            <v-card-title class="titulo2">{{ getPacientePerfil.name }} {{ getPacientePerfil.lastname }}</v-card-title>
            <v-card-subtitle class="text-center">
              Paciente
            </v-card-subtitle>
          </v-card>

        </v-col>
        <v-col cols="12" md="6">
          
            
              <div class="mt-5 ml-5">
                <v-row justify="center">
                  <v-expansion-panels accordion v-model="panel">
                    <v-expansion-panel value="true">
                      <v-expansion-panel-header class="titulo">Información personal</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-simple-table>
                          <template v-slot:default>
                        <tbody>
                          <tr>
                            <td>
                              <v-icon
                                small
                                class="mr-2"
                                v-text="'mdi-rename-box'"
                              ></v-icon
                              >NOMBRES Y APELLIDOS
                            </td>
                            <td>{{ getPacientePerfil.name }} {{ getPacientePerfil.lastname }}</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon
                                small
                                class="mr-2"
                                v-text="'mdi-credit-card'"
                              ></v-icon
                              >DNI
                            </td>
                            <td>{{ getPacientePerfil.dni }}</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon
                                small
                                class="mr-2"
                                v-text="'mdi-clock'"
                              ></v-icon
                              >EDAD
                            </td>
                            <td>{{ getPacientePerfil.edad }}</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon
                                small
                                class="mr-2"
                                v-text="'mdi-cellphone'"
                              ></v-icon
                              >CELULAR
                            </td>
                            <td>{{ getPacientePerfil.celular }}</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon
                                small
                                class="mr-2"
                                v-text="'mdi-email'"
                              ></v-icon
                              >CORREO
                            </td>
                            <td>{{ getPacientePerfil.email }}</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon
                                small
                                class="mr-2"
                                v-text="'mdi-gender-male-female-variant'"
                              ></v-icon
                              >GENERO
                            </td>
                            <td>{{ getPacientePerfil.genero }}</td>
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
      ...mapGetters(['getPacientePerfil'])
    },
    data() {
      return {
         panel: 0,
         datos: null
      }
    },


  };
</script>

<style scoped>


@import "../../../assets/css/paciente.css";
</style>
