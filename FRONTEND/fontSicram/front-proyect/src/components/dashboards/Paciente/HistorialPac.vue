<template>
  <v-card>
    <!----MODAL DE LA RECETA MEDICA-------->
    <receta-medica-pac
      :dialog="showReceta"
      @close="showReceta = false"
      :paciente="{ nombre: 'LUIS ENRIQUE', apellido: 'MEDINA CASTILLO' }"
      :doctor="{nombre: 'LUIS ENRIQUE', apellido: 'MEDINA CASTILLO', dni:'74891755'}"
      :data="dataReceta"
    />
    <v-card-title
      ><h3 class="titulo-perfil-pac">Citas Atendidas</h3></v-card-title
    >
    <v-card-text class="mt-1">
      <v-data-table
        :items="listaCitas"
        :headers="headers"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                x-large
                color="green"
                v-bind="attrs"
                v-on="on"
                @click="abrirReceta(item)"
              >
                mdi-note-plus
              </v-icon>
            </template>
            <span>Receta Médica</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon x-large color="orange darken-4" v-bind="attrs" v-on="on">
                mdi-clipboard-account-outline
              </v-icon>
            </template>
            <span>Sintomas Registrados</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RecetaMedicaPac from "./modals/RecetaMedicaPac.vue";

export default {
  components: { RecetaMedicaPac },
  name: "HistorialPac",
  data() {
    return {
      citasAtendidas: [],
      showReceta: false,
      dataReceta : {},
      headers: [
        { text: "Fecha", value: "horario.fecha", sortable: false },
        { text: "HoraInicio", value: "horario.hora_inicio", sortable: false },
        { text: "HoraFin", value: "horario.hora_fin", sortable: false },
        {
          text: "Especialidad",
          value: "especialidad.especialidad",
          sortable: false,
        },
        { text: "Doctor", value: "doctor.lastname", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(["getUsuario", "getCitasAtendidasTitular"]),
    listaCitas() {
      if (this.getCitasAtendidasTitular === null) return [];
      else return this.getCitasAtendidasTitular;
    },
  },
  methods: {
    ...mapActions(["listarCitasAtendidasTitular"]),
    //LISTA LAS CITAS ATENDIDAS DEL TITULAR
    listarCitas() {
      this.listarCitasAtendidasTitular(this.getUsuario);
    },

    abrirReceta(e) {
      this.dataReceta = e.receta
      this.showReceta = true;
    },
  },
  created() {
    this.listarCitas((res) => {
      this.citasAtendidas = this.getCitasAtendidasTitular;
    });
  },
};
</script>

<style></style>
