<template>
  <v-card>
    <v-card-title
      ><h3 class="titulo-perfil-pac">Horarios Ocupados</h3></v-card-title
    >
    <v-card-text v-if="showSkeletor == true">
      <v-sheet color="grey lighten-4" class="pa-3">
        <v-skeleton-loader
          class="mx-auto"
          type="table-tbody,actions"
        ></v-skeleton-loader>
      </v-sheet>
    </v-card-text>
    <v-card-text class="mt-1" v-if="listaCitas != null">
      <v-data-table
        :items="listaCitas"
        :headers="headers"
        sort-by="calories"
        class="elevation-1"
      >
      </v-data-table>
    </v-card-text>
    <v-card-text v-if="showNoData == true">
      <v-alert text prominent type="error" icon="mdi-cloud-alert">
        No cuenta con horarios <strong>Ocupados</strong>
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HistorialHorarioDoc",
  data() {
    return {
      showNoData: false,
      showSkeletor: false,
      headers: [
        { text: "Fecha", value: "fecha" },
        { text: "HoraInicio", value: "hora_inicio", sortable: false },
        { text: "HoraFin", value: "hora_fin", sortable: false },
        { text: "Ocupado", value: "ocupado", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(["getUsuario", "getHorariosOcupados"]),
    listaCitas() {
      if (this.getHorariosOcupados === null) return null;
      else return this.getHorariosOcupados;
    },
  },
  methods: {
    ...mapActions(["listarHorariosOcupadosDoctor"]),
    //LISTA LAS CITAS ATENDIDAS DEL TITULAR
    listarCitas() {
      this.showSkeletor = true;
      this.listarHorariosOcupadosDoctor(this.getUsuario).then((res) => {
        if (this.getHorariosOcupados == null) this.showNoData = true;
        this.showSkeletor = false;
      });
    },
  },
  created() {
    this.listarCitas();
  },
};
</script>

<style></style>
