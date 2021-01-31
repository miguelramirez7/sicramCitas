<template>
  <v-card>
    <!----MODAL DE LA RECETA MEDICA-------->
    <receta
      :data="dataReceta"
      :dialog="showReceta"
      @close="showReceta = false"
    />
    <!----MODAL DE LOS SINTOMAS ----------->
    <sintomas
      :data="dataSintomas"
      :dialog="showSintomas"
      @close="showSintomas = false"
    />
    <!----MODAL DEL INFORME MEDICO-------->
    <informe
      :data="dataInforme"
      :dialog="showInforme"
      @close="showInforme = false"
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
              <v-icon
                x-large
                color="blue"
                v-bind="attrs"
                v-on="on"
                @click="abrirInforme(item)"
              >
                mdi-clipboard-text
              </v-icon>
            </template>
            <span>Informe Médico</span>
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
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Informe from "./modals/Informe.vue";
import Receta from "./modals/Receta.vue";
import Sintomas from "./modals/Sintomas.vue";

export default {
  components: { Receta, Sintomas, Informe },

  name: "CitasPasadasDoc",
  data() {
    return {
      showReceta: false,
      showSintomas: false,
      showInforme: false,
      citasAtendidas: [],
      dataReceta: {
        nombre: "NOMBRE DOCTOR",
        apellido: "APELLIDO DOCTOR",
        fecha: "2020-20-20",
        medicamentos: [
          {
            medicamento: "pastilla",
            concentración: "conc",
            dosis_frecuencia: "frec",
            duración: "dur",
            cantidad: "ctd",
          },
        ],
      },
      dataSintomas: {
        nombreDoc: "NOMBRE DOCTOR",
        apellidoDoc: "APELLIDO DOCTOR",
        nombrePac: "NOMBRE PACIENTE",
        apellidoPac: "APELLIDO PACIENTE",
        fecha: "2020-20-20",
        sintomas: "Sintomas",
        alergias: "alergias",
      },
      dataInforme: {
        nombreDoc: "NOMBRE DOCTOR",
        apellidoDoc: "APELLIDO DOCTOR",
        nombrePac: "NOMBRE PACIENTE",
        apellidoPac: "APELLIDO PACIENTE",
        fecha: "2020-20-20",
        anamnesis: "asdasd",
        tratamiento: "ASDasdasdasd",
        diagnostico: "aasdasdasd",
        ultima_evolucion: "asdñasdjklñasdjklasd",
      },
      headers: [
        { text: "Fecha", value: "horario.fecha" },
        { text: "HoraInicio", value: "horario.hora_inicio", sortable: false },
        { text: "HoraFin", value: "horario.hora_fin", sortable: false },
        { text: "NombrePaciente", value: "user.lastname", sortable: false },
        { text: "ApellidoPaciente", value: "user.lastname", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(["getUsuario", "getCitasAtendidas"]),
    listaCitas() {
      if (this.getCitasAtendidas === null) return [];
      else return this.getCitasAtendidas;
    },
  },
  methods: {
    ...mapActions(["listarCitasAtendidas"]),
    //LISTA LAS CITAS ATENDIDAS DEL TITULAR
    listarCitas() {
      this.listarCitasAtendidas(this.getUsuario);
    },

    abrirReceta(e) {
      this.dataReceta = {
        nombreDoc: e.doctor.name,
        apellidoDoc: e.doctor.lastname,
        nombrePac: e.user.name,
        apellidoPac: e.user.lastname,
        fecha: e.horario.fecha,
        medicamentos: e.receta.medicamentos,
        especialidad: e.especialidad.especialidad,
      };
      this.showReceta = true;
    },

    abrirSintomas(e) {
      
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

    abrirInforme(e) {
      if(e.diagnostico == undefined) this.dataInforme = null
      else
      this.dataInforme = {
        nombreDoc: e.doctor.name,
        apellidoDoc: e.doctor.lastname,
        nombrePac: e.user.name,
        apellidoPac: e.user.lastname,
        fecha: e.horario.fecha,
        especialidad: e.especialidad.especialidad,
        anamnesis: "ESTE PACIENTE LLEGO CON",
        tratamiento: e.diagnostico.tratamiento,
        diagnostico: e.diagnostico.diagnostico,
        ultima_evolucion: e.diagnostico.resultados_labo,
      };
      
      this.showInforme = true
    },
  },
  created() {
    this.listarCitas((res) => {
      this.citasAtendidas = this.getCitasAtendidas;
    });
  },
};
</script>

<style></style>
