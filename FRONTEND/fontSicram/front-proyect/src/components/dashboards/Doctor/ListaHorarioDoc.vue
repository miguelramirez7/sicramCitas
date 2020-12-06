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
    <EditarHorario :dial="showEdit" :element="item" @close="showEdit = false" />
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
      :items="getHorariosDesocupados"
      sort-by="calories"
      class="elevation-1"
      v-if="getHorariosDesocupados != null"
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
        <v-icon small @click="elimiar(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import Questioner from "@/modals/Questioner.vue";
import EditarHorario from "../Doctor/modals/EditarHorarioDoctorMod.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ListaHorarioDoc",
  components: {
    EditarHorario,
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
    headers: [
      { text: "Fecha", value: "fecha" },
      { text: "Hora inicio", value: "hora_inicio" },
      { text: "Hora fin", value: "hora_fin" },
      { text: "Estado", value: "ocupado" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  computed: {
    ...mapGetters(["getHorariosDesocupados", "getUsuario","getAlert"]),
  },
  created() {
    this.listarHorariosDoctor(this.getUsuario);
  },
  methods: {
    ...mapActions(["listarHorariosDoctor","eliminarHorario"]),
    editarItem(e) {
      console.log(this.showEdit);
      console.log(e);
      this.showEdit = true;
      this.item = e;
      console.log(this.showEdit);
    },
    elimiar(e) {
      console.log(e);
      this.showQuestion = true;
      this.itemToDelete = e
    },
    eliminarItem(){
      this.showLoader = true
      let datos = {
        doctor: this.getUsuario,
        id_horario: this.itemToDelete._id,
      };
      console.log(this.itemToDelete._id)
      this.showQuestion = false;
      this.eliminarHorario(datos)
      .then((res)=>{
        this.listarHorariosDoctor(this.getUsuario)
        this.showLoader = false
        this.showAlert = true
      })
    }
  },
};
</script>

<style></style>
