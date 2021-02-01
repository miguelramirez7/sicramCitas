<template>
  <div>
    <!---MODALS------->
    <editar-cita-pendiente
      :dialog="showEdit"
      :cita="citaEditar"
      @close="showEdit = false"
    />
    <registrar-sintomas
      :dialog="showSintomas"
      @close="showSintomas = false"
      :idDoctor="idDoctor"
      :idCita="idCita"
    />
    <!----CARGADOR---->
    <loader :dialog="showLoader" />
    <!----ALERTA---->
    <alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="getAlert.mensajeAlerta"
      :tipo="getAlert.tipoAlerta"
    />
    <!---MODAL PARA EDITAR EL HORARIO---->

    <!----PREGUNTA---->
    <questioner
      :dialog="showQuestion"
      @close="showQuestion = false"
      @accept="eliminarItem()"
      :title="mensajeEliminar.titulo"
      :message="mensajeEliminar.mensaje"
    />
    <!----------------------------------->
    <div v-if="showNodata == true">
      <v-alert text prominent type="error" icon="mdi-cloud-alert">
        Al parecer aún no ha registrado citas, le recomendamos registrarla en la
        sección <strong>Nueva Cita!</strong>
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
    <div v-if="dataPacientes !== null">
      <v-data-table
        :headers="headers"
        :items="dataPacientes"
        sort-by="calories"
        class="elevation-1"
        v-if="dataPacientes != null"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editarItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-2" @click="elimiar(item)">
            mdi-delete
          </v-icon>
          <v-icon small @click="ingresar(item)">mdi-import</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import Questioner from "@/modals/Questioner.vue";
import RegistrarSintomas from "./modals/RegistrarSintomas.vue";
import EditarCitaPendiente from "./modals/EditarCitaPendiente.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CitasPendientesPacLista",
  components: {
    Questioner,
    Loader,
    Alert,
    EditarCitaPendiente,
    RegistrarSintomas,
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
    citaEditar: {
      doctor: {
        name: "Nombre",
        lastname: "Apellido",
      },
    },
    idCita: null,
    idDoctor: null,
    showSintomas: false, //MUESTRA EL MODAL PARA REGISTRAR SINTOMAS
    showEdit: false, //MUESTRA EL MODAL DE EDITAR CITA
    showEskeletor: false,
    showNoData: false,
    dataPacientes: null,
    mensajeEliminar: {
      titulo: "Eliminar Horario.",
      mensaje: "¿Está seguro que desea eliminar este horario?",
    },
    showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
    showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
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
      { text: "Acciones", value: "actions", sortable: false },
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
    //MUESTRA EL MODAL DE REGISTRAR SINTOMAS
    ingresar(e) {
      console.log(e);
      this.idCita = e._id;
      this.idDoctor = e.doctor._id;
      this.showSintomas = true;
    },
    //TIPO DE USUARIO
    userType() {
      this.showNodata = false;
      this.showEskeletor = true;
      this.dataPacientes = null;
      //console.log("asdasd",this.paciente)
      if (this.paciente.tipoPaciente == "titular") {
        this.listarCitasPendientesTitular(this.getUsuario).then((res) => {
          this.dataPacientes = this.getCitasPendientesTitular;
          this.showEskeletor = false;
          if (this.dataPacientes == null) this.showNodata = true;
        });
      } else {
        this.listarCitasPendientesDependiente({
          paciente: this.getUsuario,
          id_dependiente: this.paciente.datos._id,
        }).then((res) => {
          this.dataPacientes = this.getCitasPendientesDependiente;
          this.showEskeletor = false;
          if (this.dataPacientes == null) this.showNodata = true;
        });
      }
    },
    editarItem(e) {
      this.citaEditar = e;
      this.showEdit = true;
      console.log(this.citaEditar);
      console.log(e);
    },
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
