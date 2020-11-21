<template>
  <div>
    <!---MODAL PARA EDITAR EL HORARIO---->  
    <EditarHorario :dialog="showEdit" :element="item" @close="showEdit = false"/>
    <!----------------------------------->
    <v-data-table
      :headers="headers"
      :items="getHorariosDesocupados"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mis horarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editarItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small  @click="editarItem(item)">
          mdi-delete
        </v-icon>
      </template>
      
    </v-data-table>
  </div>
</template>
<script>
import EditarHorario from "../Doctor/modals/EditarHorarioDoctorMod.vue"
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ListaHorarioDoc",
  components:{
      EditarHorario
  },
  data: () => ({
    showEdit: false,
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
    ...mapGetters(["getHorariosDesocupados", "getUsuario"]),
  },
  created() {
    this.listarHorariosDoctor(this.getUsuario);
  },
  methods: {
    ...mapActions(["listarHorariosDoctor"]),
    editarItem(e){
        console.log(this.showEdit)
        console.log(e)
        this.showEdit=true
        this.item =e
        console.log(this.showEdit)
    },
    elimiarItem(e){
        console.log(e)
    }
    
  },
};
</script>

<style></style>
