<template>
  <v-card>
    <!----MODAL DE LA RECETA MEDICA-------->
    <receta-medica-pac
      :dialog="showReceta"
      @close="showReceta = false"
      :paciente="dataPaciente"
      :doctor="dataDoctor"
      :data="dataReceta"
    />
    <!---MODAL DEL SINTOMA REGISTRADO ------>
    <sintomas
      :data="dataSintomas"
      :dialog="showSintomas"
      @close="showSintomas = false"
    />
    <v-card-title
      ><h3 class="titulo-perfil-pac">Citas Atendidas</h3></v-card-title
    >
    <v-card-text v-if="showSkeletor == true">
      <v-sheet color="grey lighten-4" class="pa-3">
        <v-skeleton-loader
          class="mx-auto"
          type="table-tbody,actions"
        ></v-skeleton-loader>
      </v-sheet>
    </v-card-text>
    <v-card-text class="mt-1" v-if="listaCitas !== null">
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
              <v-icon
                x-large
                color="orange darken-4"
                v-bind="attrs"
                v-on="on"
                @click="abrirSintomas(item)"
              >
                mdi-clipboard-account-outline
              </v-icon>
            </template>
            <span>Sintomas Registrados</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-text v-if="showNoData == true">
      <v-alert text prominent type="error" icon="mdi-cloud-alert">
        Al parecer no cuenta con <strong>Citas atendidas.</strong>
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RecetaMedicaPac from "./modals/RecetaMedicaPac.vue";
import Sintomas from "./../Doctor/modals/Sintomas.vue";
export default {
  components: { RecetaMedicaPac,Sintomas },
  name: "HistorialPac",
  data() {
    return {
      citasAtendidas: [],
      showReceta: false,
      showSkeletor : false,
      showNoData: false,
      showSintomas: false,
      dataReceta: {},
      dataDoctor: {
        nombre: 'LUIS ENRIQUE',
        apellido: 'MEDINA CASTILLO',
        dni: '74891755',
      },
      dataPaciente: { nombre: 'LUIS ENRIQUE', apellido: 'MEDINA CASTILLO' },
      dataSintomas: {},
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
      if (this.getCitasAtendidasTitular === null) return null;
      else return this.getCitasAtendidasTitular;
    },
  },
  methods: {
    ...mapActions(["listarCitasAtendidasTitular"]),
    //LISTA LAS CITAS ATENDIDAS DEL TITULAR
    listarCitas() {
      this.showSkeletor = true;
      this.listarCitasAtendidasTitular(this.getUsuario)
      .then(res=>{
        if (this.getCitasAtendidasTitular == null) this.showNoData = true;
        this.showSkeletor = false;
      })
    },

    abrirReceta(e) {
      if (e.receta == null) this.dataReceta = null;
      else this.dataReceta = e.receta;
      this.dataPaciente = {
          nombre: e.user.name, 
          apellido: e.user.lastname, 
        }
      this.dataDoctor = {
          nombre: e.doctor.name, 
          apellido: e.doctor.lastname, 
          dni: e.doctor.dni, 
          cmp: e.doctor.cmp
        }
      this.showReceta = true;
    },

    abrirSintomas(e) {
      if (e.detalle_sintomas.sintoma == null) this.dataSintomas = null;
      else
        this.dataSintomas = {
          nombreDoc: e.doctor.name,
          apellidoDoc: e.doctor.lastname,
          nombrePac: e.user.name,
          apellidoPac: e.user.lastname,
          fecha: e.horario.fecha,
          especialidad: e.especialidad.especialidad,
          sintomas: e.detalle_sintomas.sintoma,
          alergias: "NINGUNA",
        };
        
      this.showSintomas = true;
    },
  },
  created() {
    this.listarCitas();
  },
};
</script>

<style></style>
