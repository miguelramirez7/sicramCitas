<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <v-card  >
            <div class="imagen-card">
              <img src="../../../assets/doctor.svg" alt="John" />
            </div>

            <v-card-title class="titulo2"
              >{{ getDoctorPerfil.name }}
              {{ getDoctorPerfil.lastname }}</v-card-title
            >
            <v-card-subtitle class="text-center">
              Doctor
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <div >
            <v-row justify="center">
              <v-expansion-panels v-model="panel" accordion>
                <v-expansion-panel value="true">
                  <v-expansion-panel-header color="teal lighten-2"
                    ><h4 class="titulo-perfil-doc">INFORMACIÓN PERSONAL</h4></v-expansion-panel-header
                  >
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
                            <td>
                              {{ getDoctorPerfil.name }}
                              {{ getDoctorPerfil.lastname }}
                            </td>
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
                            <td>{{ getDoctorPerfil.dni }}</td>
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
                            <td>{{ getDoctorPerfil.edad }}</td>
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
                            <td>{{ getDoctorPerfil.celular }}</td>
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
                            <td>{{ getDoctorPerfil.email }}</td>
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
                            <td>{{ getDoctorPerfil.genero }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header color="teal lighten-2"
                    ><h4 class="titulo-perfil-doc">INFORMACIÓN PROFESIONAL</h4></v-expansion-panel-header
                  >
                  <v-expansion-panel-content >
                    <v-simple-table >
                      <template v-slot:default >
                        <tbody >
                          <tr>
                            <td>
                              <v-icon
                                small
                                class="mr-2"
                                v-text="'mdi-school'"
                              ></v-icon
                              >ESPECIALIDAD
                            </td>
                            <td>
                              {{ getDoctorPerfil.especialidad.especialidad }}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon
                                small
                                class="mr-2"
                                v-text="'mdi-tag'"
                              ></v-icon
                              >CMP
                            </td>
                            <td>{{ getDoctorPerfil.cmp }}</td>
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TuPerfilDoc",
  computed: {
    ...mapGetters(["getDoctorPerfil"]),
  },
  data() {
    return {
      panel: 0,
    };
  },
};
</script>

<style scoped>
@import "../../../assets/css/doctor.css";
.titulo-perfil-doc {
  color: white;
}
</style>
