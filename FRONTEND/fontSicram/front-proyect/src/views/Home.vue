<template>
  <div class="imagen">
    <!---------------MODALES---------------------->
    <Login :dialog="loginDialog" @close="loginDialog = false" />
    <RegistroPacienteMod
      :dialog="items[1].action"
      @close="items[1].action = false"
    />
    <RegistroDoctorMod
      :dialog="items[2].action"
      @close="items[2].action = false"
    />
    <RegistroOrganizacionMod
      :dialog="items[0].action"
      @close="items[0].action = false"
    />
    <!-------------------------------------------->
    <v-app-bar color="" dense dark absolute>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="mostrarEnPantallaPequeña"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="d-flex justify-center">SICRAM</v-toolbar-title>

      <v-spacer class="ocultarEnPantallaPequeña"></v-spacer>

      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ocultarEnPantallaPequeña" v-bind="attrs" v-on="on">
            Registrarse
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="items[0].action = true">
            <v-list-item-title>Organización</v-list-item-title>
          </v-list-item>
          <v-list-item @click="items[1].action = true">
            <v-list-item-title>Paciente</v-list-item-title>
          </v-list-item>
          <v-list-item @click="items[2].action = true">
            <v-list-item-title>Dóctor</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer color="#f2f2f2" app v-model="drawer" clipped>
      <v-list shaped>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="cyan">view_sidebar</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              Menú
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list-item-group color="teal lighten-2">
          <v-list-item  @click="loginDialog = true">
            <v-list-item-title>Ingresar</v-list-item-title>
          </v-list-item>

          <v-list-group
            no-action
            color="teal lighten-2"
          >
            <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Registrarse</v-list-item-title>
            </v-list-item-content>
          </template>

            <v-list-item v-for="(child, i) in items" :key="i" @click="child.action = true">
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>

        <v-divider />
      </v-list>
    </v-navigation-drawer>
    <div class="d-flex flex-column align-center justify-center principal">
      <div class="contenedor">
        <h1
          class="titulo  font-weight-black mb-5 text-center white--text d-flex align-center"
        >
          BIENVENIDO A SICRAM
        </h1>
        <h2 class="grey--text mb-5 subtitulo">Consultorio de citas médicas</h2>
        <v-btn
          class="mx-2"
          dark
          large
          color="cyan"
          elevation="10"
          @click="loginDialog = true"
        >
          <v-icon left>
            accessibility
          </v-icon>
          COMENZAR
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/modals/Login.vue";
import RegistroPacienteMod from "@/modals/RegistroPacienteMod.vue";
import RegistroDoctorMod from "@/modals/RegistroDoctorMod.vue";
import RegistroOrganizacionMod from "@/modals/RegistroOrganizacionMod.vue";
export default {
  name: "Home",
  components: {
    Login,
    RegistroPacienteMod,
    RegistroDoctorMod,
    RegistroOrganizacionMod,
  },
  data() {
    return {
      loginDialog: false, //VARIABLE PARA ABRIR EL MODAL DE LOGIN
      claseHome: {
        background: "red",
        color: "black",
        width: "500px",
      },
      drawer: false,
      group: null,
      items: [
            {
              title: "Organización",
              action: false
            },
            {
              title: "Paciente",
              action: false
            },
            {
              title: "Doctor",
              action: false 
            },
      ],
    };
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>
.imagen {
  width: 100%;
  height: 100%;

  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  background-size: cover;
  display: block;
  position: relative;
  object-fit: cover;
  background-image: linear-gradient(
      to right,
      rgba(5, 12, 31, 0.493),
      rgba(5, 12, 31, 0.493)
    ),
    url("../assets/doctorHome.jpg");
}

.principal {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.contenedor {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
}

.titulo {
  font-size: 80px;
  font-family: "open sans";
}

.mostrarEnPantallaPequeña {
  display: none;
}

@media (max-width: 414px) {
  .titulo {
    font-size: 30px;
  }

  .subtitulo {
    font-size: 20px;
  }

  .centrar {
    display: flex !important;
    justify-content: center !important;
  }

  .mostrarEnPantallaPequeña {
    display: block;
  }

  .ocultarEnPantallaPequeña {
    display: none;
  }
}
</style>
