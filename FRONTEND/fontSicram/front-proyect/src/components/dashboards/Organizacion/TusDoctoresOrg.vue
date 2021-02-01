<template>
  <v-card>
    <loader :dialog="showLoader" />
    <alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    />
    <questioner
      :dialog="showQuestioner"
      @close="showQuestioner = false"
      :title="'ELIMINAR FAMILIAR'"
      :message="'¿Está seguro de que desea aliminar este familiar?'"
      @accept="eliminarItem"
    />

    <v-card-title
      ><h3 class="titulo-perfil-pac">LISTA DE FAMILIARES</h3></v-card-title
    >
    <v-card-text v-if="showSkeletor == true">
      <v-sheet color="grey lighten-4" class="pa-3">
        <v-skeleton-loader
          class="mx-auto"
          type="table-tbody,actions"
        ></v-skeleton-loader>
      </v-sheet>
    </v-card-text>
    <v-card-text class="mt-1" v-if="listaDoctores !=null">
      <v-data-table
        :items="listaDoctores"
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
                color="red"
                v-bind="attrs"
                v-on="on"
                @click="eliminar(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Eliminar familiar</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-text v-if="showNoData==true">
      <v-alert text prominent type="error" icon="mdi-cloud-alert">
        No cuenta con Doctores registrados, diríjase la sección <strong>Agregar Doctor.</strong>
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Alert from "@/modals/Alert.vue";
import Loader from "@/modals/Loader.vue";
import Questioner from "@/modals/Questioner.vue";

export default {
  data() {
    return {
      showAlert: false,
      showLoader: false,
      showQuestioner: false,
      familiarItem: null,
      showSkeletor: false,
      showNoData: false,
      headers: [
        {
          text: "Especialidad",
          value: "especialidad.especialidad",
          sortable: false,
        },
        { text: "Género", value: "genero", sortable: false },
        { text: "NombreDoctor", value: "name", sortable: false },
        { text: "ApellidoDoctor", value: "lastname", sortable: false },
        { text: "email", value: "email", sortable: false },
        { text: "DNI", value: "dni", sortable: false },
        { text: "celular", value: "celular", sortable: false },
        { text: "Edad", value: "edad", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  components: {
    Loader,
    Questioner,
    Alert,
  },
  methods: {
    ...mapActions(["listarDoctorOrga", "eliminarDoctor"]),
    listar(){
      this.showSkeletor = true
      this.listarDoctorOrga(this.getUsuario).then((res) => {
      console.log(this.getDoctoresOrganizacion);
      if(this.getDoctoresOrganizacion== null) this.showNoData = true
      this.showSkeletor = false
    });
    },
    eliminar(e) {
      this.familiarItem = e;
      this.showQuestioner = true;
      console.log("FAMILIAR A ELIMINAR", this.familiarItem);
    },
    eliminarItem() {
      this.showQuestioner = false;
      this.showLoader = true;
      const datos = {
        organizacion: this.getUsuario,
        id_doctor: this.familiarItem._id,
      };
      this.eliminarDoctor(datos).then((res) => {
        this.showAlert = true;
        this.showLoader = false;
        this.listar()
      });
    },
  },
  computed: {
    ...mapGetters(["getDoctoresOrganizacion", "getUsuario", "getAlert"]),
    listaDoctores() {
      if (this.getDoctoresOrganizacion === null) return null;
      else return this.getDoctoresOrganizacion;
    },
  },
  created() {
    this.listar()
  },
};
</script>

<style scoped>
.titulo-perfil-pac {
  color: teal;
}
</style>
