<template>
  <div>
    <!----CARGADOR---->
    <Loader :dialog="showLoader" />
    <!----ALERTA---->
    <Alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    />
    <!---MODAL PARA EDITAR EL HORARIO---->

    <!----PREGUNTA---->
    <Questioner
      :dialog="showQuestion"
      @close="showQuestion = false"
      @accept="eliminarItem()"
      :title="mensajeEliminar.titulo"
      :message="mensajeEliminar.mensaje"
    />
    <!----------------------------------->
    <div v-if="showNodata == true">
      <v-alert text prominent type="error" icon="mdi-cloud-alert">
        Al parecer aún no se han registrado citas en sus horarios registrados,
        si no cuenta con uno puede registrarlo en
        <strong>Agregar Horario!</strong>
      </v-alert>
    </div>
    <div v-if="showEskeletor == true">
      <v-sheet color="grey lighten-4" class="pa-3">
        <v-skeleton-loader
          class="mx-auto"
          type="table-tbody,actions"
        ></v-skeleton-loader>
      </v-sheet>
    </div>

    <div>
      <v-data-table
        :headers="headers"
        :items="dataPacientes"
        sort-by="calories"
        class="elevation-1"
        v-if="dataPacientes != null"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <router-link :to="{ name: 'CitaDoctor', params: { id: item._id } }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-video-plus</v-icon>
              </template>
              <span>Ir a la llamada</span>
            </v-tooltip>
          </router-link>
          <v-icon class="ml-2" small @click="elimiar(item)">mdi-import</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import Questioner from "@/modals/Questioner.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CitasPendientesDocLista",
  components: {
    Questioner,
    Loader,
    Alert,
  },

  data: () => ({
    showEskeletor: false,
    showNoData: false,
    mensajeEliminar: {
      titulo: "Eliminar Horario.",
      mensaje: "¿Está seguro que desea eliminar este horario?",
    },
    showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
    showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
    showEdit: false, //MUESTRA EL MODAL PARA EDITAR EL HORARIO
    showQuestion: false, //MUESTRA LA PREGUNTA ANTES DE ELIMNAR UN HORARIO
    itemToDelete: null, //ES EL HORARIO A ELIMINAR
    item: null,
    dataPacientes: null,
    headers: [
      { text: "Fecha", value: "horario.fecha" },
      { text: "PacienteNombre", value: "user.name" },
      { text: "PacienteApellido", value: "user.lastname" },
      { text: "Hora inicio", value: "horario.hora_inicio" },
      { text: "Hora fin", value: "horario.hora_fin" },
      { text: "Estado", value: "estado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
  }),

  computed: {
    ...mapGetters(["getUsuario", "getAlert", "getCitasPendientes"]),
  },
  created() {
    this.userType();
  },
  methods: {
    ...mapActions(["listarCitasPendientes"]),
    //TIPO DE USUARIO
    userType() {
      this.showNodata = false;
      this.showEskeletor = true;
      this.dataPacientes = null;
      this.listarCitasPendientes(this.getUsuario).then((res) => {
        this.dataPacientes = this.getCitasPendientes;
        this.showEskeletor = false;
        if (this.dataPacientes == null) this.showNodata = true;
      });
    },
    editarItem(e) {},
    elimiar(e) {},
    eliminarItem() {},
  },
};
</script>

<style></style>
