<template>
  <v-app>

    <div>
      <v-app-bar app dark color="teal lighten-2" clipped-left>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Vuetify</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>


    </div>
    <v-navigation-drawer color="#f2f2f2" app v-model="drawer" clipped>
      <v-list shaped >
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              Nombre Paciente
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list-group no-action color='teal lighten-2' v-for="item in items" :key="item.title" v-model="item.active"
          :prepend-icon="item.action">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item-group >
              <v-list-item v-for="child in item.items" :key="child.title" >
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item>
            </v-list-item-group>
        </v-list-group>
      
      <v-divider />

      <v-list-item-group color='pink'>
      <v-list-item link> 
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






  </v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {

    },
    data: () => ({
      drawer: null,
      group: null,

       items: [{
          action: 'mdi-home',
          
          title: 'Inicio',
        },
        {
          action: 'mdi-account',
          active: false,
          items: [{
              title: 'Tu Perfil'
            },
            {
              title: 'Actualizar Datos'
            }
          ],
          title: 'Perfil',
        },
        {
          action: 'mdi-account-supervisor',
          items: [{
            title: 'Registrar Familiar'
          },
          {
            title: 'Listar Familiares'
          }
          ],
          title: 'Familiar',
        },
        {
          action: 'mdi-calendar',
          items: [{
            title: 'Nueva Cita'
          },
          {
            title: 'Citas Pendiente'
          },
          {
            title: 'Historial'
          }],
          title: 'Citas',
        }
      ],

    }),

    watch: {
      group() {
        this.drawer = false
      },
    },
  };
</script>

<style scoped>
  

</style>