<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <v-card>
            <div class="imagen-card">
              <img src="../../../assets/organizacion.svg" alt="">
            </div>

            <v-card-title class="titulo2"
              >{{ getOrganizacionPerfil.nameOrg }}
            </v-card-title
            >
            <v-card-subtitle class="text-center">
              ORGANIZACIÓN
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <v-row justify="center">
              <v-expansion-panels v-model="panel" accordion>
                <v-expansion-panel value="true">
                  <v-expansion-panel-header color="teal lighten-2"
                    ><h4 class="titulo-perfil-doc">
                      INFORMACIÓN ORGANIZACIÓN
                    </h4></v-expansion-panel-header
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
                              >NOMBRE ORGANIZACIÓN
                            </td>
                            <td>
                              {{ getOrganizacionPerfil.nameOrg }}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon
                                small
                                class="mr-2"
                                v-text="'mdi-credit-card'"
                              ></v-icon
                              >RUC
                            </td>
                            <td>{{ getOrganizacionPerfil.ruc }}</td>
                          </tr>
                          <tr>
                            <td>
                              <v-icon
                                small
                                class="mr-2"
                                v-text="'mdi-map-marker '"
                              ></v-icon
                              >DIRECCIÓN
                            </td>
                            <td>{{ getOrganizacionPerfil.direccion }}</td>
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
                            <td>{{ getOrganizacionPerfil.email }}</td>
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
  name: "TuPerfilOrg",
  computed: {
    ...mapGetters(["getOrganizacionPerfil"]),
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
