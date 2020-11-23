<template>
  <v-app>
    <template >
      <v-app-bar app dark color="teal lighten-2" clipped-left>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>SICRAM</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>
    </template>
    <template>
      <v-navigation-drawer color="#f2f2f2" app v-model="drawer" clipped>
        <v-list shaped>
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="../assets/doctor.svg"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                Nombre Doctor
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider />

          <v-list-item-group color="teal lighten-2">
            <v-list-item @click="cambiarComponenteDoctor('InicioDoctor')">
              <v-list-item-action>
                <v-icon>mdi-home</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Inicio</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-group
              no-action
              color="teal lighten-2"
              v-for="item in items"
              :key="item.title"
              :prepend-icon="item.action"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="child in item.items"
                :key="child.title"
                @click="cambiarComponenteDoctor(child.componente)"
              >
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item>
            </v-list-group>
          </v-list-item-group>

          <v-divider />

          <v-list-item link>
            <v-list-item-action>
              <v-icon color="red">mdi-export</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Salir</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </template>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: true,
    group: null,
    items: [
      {
        action: "mdi-account",
        items: [
          {
            title: "Tu Perfil",
            componente: "TuPerfilDoc",
          },
          {
            title: "Actualizar Datos",
            componente: "ActualizarPerfilDoc",
          },
        ],
        title: "Perfil",
      },
      {
        action: "mdi-calendar",
        items: [
          {
            title: "Agregar Horario",
            componente: "AgregarHorarioDoc",
          },
          {
            title: "Historial Horario",
            componente: "HistorialHorarioDoc",
          },
        ],
        title: "Horario",
      },
      {
        action: "mdi-mailbox",
        items: [
          {
            title: "Citas Pendientes",
            componente: "CitasPendientesDoc",
          },
          {
            title: "Citas Pasadas",
            componente: "CitasPasadasDoc",
          },
        ],
        title: "Buzón",
      },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    ...mapActions(["cambiarComponenteDoctor"]),
  },
};
</script>

<style>
.v-application--wrap {
  padding-top: 10px;
  padding-left: 15px;
  min-height: 0 !important;
}

.v-list-item--link[data-v-169ff5e0]::before {
  color: teal;
  
}

@import "../assets/css/doctor.css";
</style>
