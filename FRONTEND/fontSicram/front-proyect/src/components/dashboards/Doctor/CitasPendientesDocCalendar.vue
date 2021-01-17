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
    <v-row class="fill-height">
      <v-col>
        <v-sheet
          :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
          v-if="dataPacientes == null"
        >
          <v-skeleton-loader
            class="mx-auto "
            max-width="100%"
            height="100%"
            type="date-picker"
          ></v-skeleton-loader>
        </v-sheet>
        <v-sheet height="64" v-if="dataPacientes != null">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="teal darken-2"
              @click="setToday"
            >
              Hoy
            </v-btn>
            <v-btn fab text small color="teal darken-2" @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="teal darken-2" @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar" style="color:teal">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="teal darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Día</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Semana</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mes</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>

        <v-sheet height="350" v-if="dataPacientes != null">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="teal"
            locale="pe"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" width="500px" flat class="pa-0">
              <v-toolbar :color="selectedEvent.color" dark class="pa-0">
                <v-toolbar-title v-html="'CITA PENDIENTE'"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-row>
                  <v-col sm="5" md="5" style="color: black;">
                    Paciente:
                  </v-col>
                  <v-col sm="7" md="7" style="color: black;">
                    {{ selectedEvent.paciente }}
                  </v-col>
                  <v-col sm="5" md="5" style="color: black;">
                    Horario:
                  </v-col>
                  <v-col sm="7" md="7" style="color: black;">
                    {{ selectedEvent.horario }}
                  </v-col>
                  <v-col sm="12" md="12" class="d-flex justify-center">
                    <v-btn
                      :color="selectedEvent.color"
                      style="color:white;"
                      @click="ingresarCita(selectedEvent)"
                    >
                      Ingresar
                      <v-icon>mdi-import</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CitasPendientesDocCalendar",
  components: {
    Loader,
    Alert,
  },
  data: () => ({
    dataPacientes: null,
    showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
    showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
    focus: "",
    type: "week",
    typeToLabel: {
      month: "Mes",
      week: "Semana",
      day: "Día",
    },
    selccion: {},
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
  }),
  mounted() {
    this.userType();
    console.log("los horarios son:");
  },
  methods: {
    ...mapActions(["listarCitasPendientes", "save_idCita"]),
    //INGRESA A LA CITA SELECCIONADA
    ingresarCita(e) {
      this.showLoader = true;
      setTimeout(() => {
        this.showLoader = false;
        console.log(e);
        this.save_idCita(e.data._id);
        this.$router.push({
          name: "CitaDoctor",
          params: { id: e.data.user._id },
        });
      }, 1500);

      //this.idDoctor = e.data.doctor._id
    },
    //TIPO DE USUARIO
    userType() {
      this.dataPacientes = null;
      this.listarCitasPendientes(this.getUsuario).then((res) => {
        this.dataPacientes = this.getCitasPendientes;
      });
    },
    //AGREGAR HORARIO:
    agregar(event) {
      this.selectedOpen = false;
      this.selccion = event;
      console.log(this.selccion);
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },

    updateRange({ start, end }) {
      console.log("los horarios son:", this.events);
      this.$refs.calendar.checkChange();
      this.$refs.calendar.scrollToTime("08:00");
      const dataTime = this.dataPacientes;
      this.events = [];
      const events = [];
      for (let i = 0; i < dataTime.length; i++) {
        const first =
          dataTime[i].horario.fecha + " " + dataTime[i].horario.hora_inicio;
        const second =
          dataTime[i].horario.fecha + " " + dataTime[i].horario.hora_fin;
        const data = dataTime[i];

        events.push({
          name: "Cita pendiente",
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          data: data,
          paciente: dataTime[i].user.name + " " + dataTime[i].user.lastname,
          horario:
            dataTime[i].horario.hora_inicio +
            " - " +
            dataTime[i].horario.hora_fin,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },

  computed: {
    ...mapGetters(["getUsuario", "getAlert", "getCitasPendientes"]),
  },

  inject: {
    theme: {
      default: { isDark: false },
    },
  },
};
</script>
