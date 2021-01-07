<template>
  <v-card>
    <!---------------MODALES---------------------->
    <EditarDependiente
      :dialog="editarDependienteDialog"
      :datos="dependiente"
      @close="editarDependienteDialog = false"
    />
    <v-card-title
      ><h3 class="titulo-perfil-pac">LISTA DE FAMILIARES</h3></v-card-title
    >
    <v-card-text class="mt-1">
      <v-data-table
        :items="listaDependientes"
        :headers="headers"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:[`item.genero`]="{ item }">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                x-large
                color="blue"
                v-bind="attrs"
                v-on="on"
                v-if="item.genero == 'FEMENINO'"
              >
                mdi-human-female
              </v-icon>
            </template>
            <span>FEMENINO</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                x-large
                color="blue"
                v-bind="attrs"
                v-on="on"
                v-if="item.genero == 'MASCULINO'"
              >
                mdi-human-male
              </v-icon>
            </template>
            <span>MASCULINO</span>
          </v-tooltip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                x-large
                color="green"
                v-bind="attrs"
                v-on="on"
                @click="editar(item)"
              >
                mdi-square-edit-outline
              </v-icon>
            </template>
            <span>Actualizar familiar</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon x-large color="orange darken-4" v-bind="attrs" v-on="on">
                mdi-delete
              </v-icon>
            </template>
            <span>Eliminar familiar</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditarDependiente from "./modals/EditarDependiente.vue";
export default {
  data() {
    return {
      editarDependienteDialog: false,
      dependiente: {
        name: "jorge",
        lastname: "nuñez",
        email: "email1@email.com", //
        genero: "genero",
        edad: "12",
        discapacidad: "ninguna", //
        celular: "",
        direccion: "ninguna", //
        dni: "98655421",
      },
      headers: [
        { text: "Género", value: "genero", sortable: false  },
        { text: "NombreFamiliar", value: "name" , sortable: false  },
        { text: "ApellidoFamiliar", value: "lastname" , sortable: false },
        { text: "DNI", value: "dni" , sortable: false },
        { text: "celular", value: "celular" , sortable: false },
        { text: "Edad", value: "edad" , sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [
        {
          genero: "MASCULINO",
          name: "LUIS ENRIQUE",
          lastname: "MEDINA CASTILLO",
          dni: "789456213",
          celular: "973834496",
          edad: "21",
        },
        {
          genero: "FEMENINO",
          name: "GRETA MURIEL",
          lastname: "ZAVALETA DEXTRE",
          dni: "789456213",
          celular: "973834496",
          edad: "22",
        },
      ],
    };
  },
  components: {
    EditarDependiente,
  },
  methods: {
      ...mapActions(['listarDependientes']),
    editar(elemento) {
      this.editarDependienteDialog = !this.editarDependienteDialog
      console.log(elemento)
      this.dependiente = elemento
    },
  },
  computed: {
      ...mapGetters(['getListaDependientes','getUsuario']),
    listaDependientes(){
        if(this.getListaDependientes === null) return []
        else return this.getListaDependientes
    }
  },
  created(){
      this.listarDependientes(this.getUsuario)
      .then(res=>{
          console.log(this.getListaDependientes)
      })
  }
};
</script>

<style scoped>
.titulo-perfil-pac {
  color: teal;
}
</style>
