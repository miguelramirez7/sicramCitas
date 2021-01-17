<template>
  <v-app>

    <template>
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
      <v-list shaped >
        <v-list-item>
          <v-list-item-avatar>
            <img src="../assets/organizacion.svg" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              Nombre Paciente
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list-item-group>
          <v-list-item link color='teal lighten-2' @click="cambiarComponenteOrganizacion('InicioOrganizacion')"> 
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group no-action color='teal lighten-2' v-for="item in items" :key="item.title" v-model="item.active"
          :prepend-icon="item.action">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item-group >
              <v-list-item v-for="child in item.items" :key="child.title" @click="cambiarComponenteOrganizacion(child.componente)">
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item>
            </v-list-item-group>
        </v-list-group>
        </v-list-item-group>
      <v-divider />

      <v-list-item-group color='pink'>
      <v-list-item link @click="cerrarSesion"> 
          <v-list-item-action>
            <v-icon color="red">mdi-export</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-item-group>

        

      </v-list>



    </v-navigation-drawer>
    </template>






  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    name: 'App',
    components: {

    },
    data: () => ({
      drawer: null,
      group: null,

       items: [
        {
          action: 'mdi-account',
          active: false,
          items: [{
              title: 'Tu Perfil',
              componente: 'TuPerfilOrg'
            },
            {
              title: 'Actualizar Datos',
              componente: 'ActualizarDatosOrg'
            }
          ],
          title: 'Perfil',
        },
        {
          action: 'mdi-account-supervisor',
          items: [{
            title: 'Agregar Doctor',
            componente: 'AgregarDoctorOrg'
          },
          {
            title: 'Tus Doctores',
            componente: 'TusDoctoresOrg'
          }
          ],
          title: 'Personal',
        },
        
      ],

    }),

    watch: {
      group() {
        this.drawer = false
      },
    },
    methods:{
      ...mapActions(['cambiarComponenteOrganizacion',"cerrarSesion"])
    }
  };
</script>

<style >
  .v-application--wrap {
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 10px;
    min-height: 0 !important;
}


</style>