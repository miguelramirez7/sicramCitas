<template>
  <div>
    <v-card class="pa-2" tile>
      <v-row>
        <v-col sm="12" md="12" class="pb-0">
          <v-sheet height="64">
            <v-toolbar flat>
              <v-toolbar-title style="color:teal">
                Citas pendientes de {{getDoctorPerfil.name}} {{getDoctorPerfil.lastname}}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="teal darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="vistaCalendar">
                    <v-list-item-title>Calendario</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="vistaLista">
                    <v-list-item-title>Lista</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
        </v-col>
        <v-col sm="12" md="12" class="pt-0">
          <component :is="vista" ref="childComponent"></component>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CitasPendientesDocCalendar from "./CitasPendientesDocCalendar.vue";
import CitasPendientesDocLista from "./CitasPendientesDocLista.vue";
export default {
  name: "CitasPendientesDoc",
  components: {
    CitasPendientesDocCalendar,
    CitasPendientesDocLista,
  },
  data() {
    return {
      type: "calendario",
      typeToLabel: {
        lista: "Lista",
        calendario: "Calendario",
      },
      vista: "CitasPendientesDocCalendar",
      
    };
  },
  methods: {
    ...mapActions(["listarDependientes"]),
    vistaLista() {
      this.type = "lista";
      this.vista = "CitasPendientesDocLista";
    },

    vistaCalendar() {
      this.type = "calendario";
      this.vista = "CitasPendientesDocCalendar";
    },

  },
  computed: {
    ...mapGetters(["getUsuario","getDoctorPerfil"]),
  },
  created() {
    
  },

  inject: {
    theme: {
      default: { isDark: false },
    },
  },
};
</script>

<style></style>
