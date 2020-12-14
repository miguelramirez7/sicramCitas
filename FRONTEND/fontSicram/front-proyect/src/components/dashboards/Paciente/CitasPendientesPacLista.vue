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
        <v-icon small class="mr-2" @click="editarItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="elimiar(item)">
          mdi-delete
        </v-icon>
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
  name: "CitasPendientesPacLista",
  components: {
    Questioner,
    Loader,
    Alert,
  },

  props: {
    paciente: {
      type: Object,
      default: {
        tipoPaciente: "titular",
        datos: {},
      },
    },
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
      { text: "Doctor", value: "doctor.lastname" },
      { text: "Especialidad", value: "especialidad.especialidad" },
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
      "getCitasPendientesTitular",
      "getCitasPendientesDependiente",
    ]),
  },
  created() {
    this.userType();
  },
  methods: {
    ...mapActions([
      "listarCitasPendientesTitular",
      "listarCitasPendientesDependiente",
    ]),
    //TIPO DE USUARIO
    userType() {
      this.dataPacientes = null;
      //console.log("asdasd",this.paciente)
      if (this.paciente.tipoPaciente == "titular") {
        this.listarCitasPendientesTitular(this.getUsuario).then((res) => {
          this.dataPacientes = this.getCitasPendientesTitular;
        });
      } else {
        this.listarCitasPendientesDependiente({
          paciente: this.getUsuario,
          id_dependiente: this.paciente.datos._id,
        }).then((res) => {
          this.dataPacientes = this.getCitasPendientesDependiente;
        });
      }
    },
    editarItem(e) {},
    elimiar(e) {},
    eliminarItem() {},
  },

  watch: {
    paciente: {
      handler: function(val, oldVal) {
        this.userType();
      },
    },
  },
};
</script>

<style></style>
