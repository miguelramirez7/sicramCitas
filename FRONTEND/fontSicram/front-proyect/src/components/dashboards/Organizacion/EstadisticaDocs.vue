<template>
  <div>
    <v-row>
      <v-col sm="6" md="6">
        <v-card class="mx-auto text-center" dark color="teal lighten-1" max-width="100%">
          <v-card-text v-if="reporte1 != null">
            <v-sheet color="teal lighten-1">
              <v-sparkline
                auto-line-width
                :value="report1data"
                :labels="reporte1"
                color="rgba(0, 0, 0, .12)"
                height="200"
                type="bars"
              >
                <template v-slot:label="item">
                  {{ item.value }}
                </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="display-1 font-weight-thin">
              <strong>Doctores por especialidad</strong>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" md="6">
        <v-card class="mx-auto text-center" dark color="teal lighten-1" max-width="100%">
          <v-card-text v-if="reporte2 != null">
            <v-sheet color="teal lighten-1">
              <v-sparkline
                auto-line-width
                :value="report2data"
                :labels="reporte2"
                color="rgba(0, 0, 0, .12)"
                height="200"
                type="bars"
              >
                <template v-slot:label="item">
                  {{ item.value }}
                </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="display-1 font-weight-thin">
              <strong>Pacientes atendidos</strong>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    num: 0,
    num2: 0,
    value: [423, 446, 675, 510, 590, 610, 760],
  }),
  methods: {
    ...mapActions([
      "reporteDoctoresEspecialidad",
      "reportePacienteAtendidoDoc",
      "reporteCitaAtendidaDoc",
      "reporteAtendidosEspecialidad",
    ]),
  },
  computed: {
    ...mapGetters([
      "getEstadistica1",
      "getEstadistica2",
      "getEstadistica3",
      "getEstadistica4",
    ]),
    reporte1() {
      if (this.getEstadistica1 == null) {
        return null;
      } else {
        this.num = 0;
        const data = [];
        this.getEstadistica1.forEach((element) => {
          if (element.especialidad != undefined && element.cantDoctor != 0) {
            data.push(element.especialidad + " ctd: " + element.cantDoctor);
          }

          this.num = +1;
        });
        console.log(data);
        return data;
      }
    },

    report1data() {
      if (this.getEstadistica1 == null) {
        return null;
      } else {
        const data = [];
        this.getEstadistica1.forEach((element) => {
          if (element.especialidad != undefined && element.cantDoctor != 0)
            data.push(element.cantDoctor);
        });
        console.log(data);
        return data;
      }
    },

    reporte2() {
      if (this.getEstadistica4 == null) {
        return null;
      } else {
        const data = [];
        this.getEstadistica4.forEach((element) => {
          if (element.especialidad != undefined && element.cantCitas != 0) {
            data.push(element.especialidad + " ctd: " + element.cantCitas);
          }

          this.num = +1;
        });
        console.log(data);
        return data;
      }
    },

    report2data() {
      if (this.getEstadistica4 == null) {
        return null;
      } else {
        const data = [];
        this.getEstadistica4.forEach((element) => {
          if (element.especialidad != undefined && element.cantCitas != 0) {
            data.push(element.cantCitas);
          }
        });
        console.log(data);
        return data;
      }
    },
  },
  created() {
    this.reporteDoctoresEspecialidad();
    this.reportePacienteAtendidoDoc();
    this.reporteCitaAtendidaDoc();
    this.reporteAtendidosEspecialidad();
  },
};
</script>

<style></style>
