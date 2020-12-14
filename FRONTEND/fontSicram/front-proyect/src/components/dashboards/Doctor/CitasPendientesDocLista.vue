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
    <v-data-table
      :headers="headers"
      :items="dataPacientes"
      sort-by="calories"
      class="elevation-1"
      v-if="dataPacientes != null"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mis horarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="elimiar(item)">mdi-import</v-icon>
      </template>
    </v-data-table>
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
      { text: "PacienteNombre", value: 'user.name' },
      { text: "PacienteApellido", value: 'user.lastname' },
      { text: "Hora inicio", value: "horario.hora_inicio" },
      { text: "Hora fin", value: "horario.hora_fin" },
      { text: "Estado", value: "estado" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  computed: {
    ...mapGetters([
      "getUsuario",
      "getAlert",
      "getCitasPendientes",
    ]),
  },
  created() {
    this.userType();
  },
  methods: {
    ...mapActions([
      "listarCitasPendientes"
    ]),
    //TIPO DE USUARIO
    userType() {
      this.dataPacientes = null
      this.listarCitasPendientes(this.getUsuario)
      .then(res=>{
          this.dataPacientes = this.getCitasPendientes
      })
    },
    editarItem(e) {},
    elimiar(e) {},
    eliminarItem() {},
  },

};
</script>

<style></style>
