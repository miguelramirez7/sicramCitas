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
    <!---PREGUNTA----->
    <Questioner
      :dialog="showQuestion"
      @close="showQuestion = false"
      @accept="editarCita()"
      :title="mensajeEliminar.titulo"
      :message="mensajeEliminar.mensaje"
    />
    <!---------------->

    <v-row class="fill-height" >
      <v-col>
        <h4>
          Horarios disponibles del Dr. {{dataCita.doctor.name}} {{dataCita.doctor.lastname}}
        </h4>
        <v-sheet
          :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
          class="pa-3"
          v-if="dataTime == null"
        >
          <v-skeleton-loader
            class="mx-auto "
            max-width="100%"
            height="100%"
            type="date-picker"
          ></v-skeleton-loader>
        </v-sheet>
        <v-sheet height="64" v-if="dataTime != null">
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
        <v-sheet height="350" v-if="dataTime != null">
          <v-calendar
            ref="calendar"
            v-model="focus"
            locale="es"
            color="teal"
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
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-y
          >
            <v-card color="grey lighten-4" min-width="350px" flat class="pa-0">
              <v-toolbar :color="selectedEvent.color" dark class="pa-0">
                <v-btn icon @click="editar(selectedEvent)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title>
                  Disponible de {{ selectedEvent.inicio }} -
                  {{ selectedEvent.fin }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-btn icon @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
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
import Questioner from "@/modals/Questioner.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditarHorarioPacienteDoc",
  components: {
    Loader,
    Alert,
    Questioner
  },
  props: {
    dataTime: {
      type: Array,
      default: null,
    },
    dataCita: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    showQuestion: false, //MUESTRA LA PREGUNTA DE ACEPTAR
    showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
    showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
    mensajeEliminar: {
      titulo: "Modificar Cita.",
      mensaje: "¿Está seguro que desea modificar esta Cita?",
    },
    focus: "",
    type: "week",
    typeToLabel: {
      month: "Mes",
      week: "Semana",
      day: "Día",
    },
    alerta: {
      mensajeAlerta: "",
      tipoAlerta: "",
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
    this.$refs.calendar.checkChange();
    this.$refs.calendar.scrollToTime("08:00");
    console.log("los horarios son:", this.events);
  },
  methods: {
    ...mapActions([
      "actualizarCitaPacienteTitular",
      "registrarCitaDependiente",
    ]),
    //AGREGAR HORARIO:
    editar(event) {
      this.selectedOpen = false;
      this.selccion = event;
      console.log(this.selectedEvent);
      console.log(this.dataCita);
      this.showQuestion = true;
    },

    editarCita() {
        this.showQuestion = false
        this.showLoader = true
      const datos = {
        id_cita: this.dataCita._id,
        fecha: this.selccion.data.fecha,
        hora_inicio: this.selccion.data.hora_inicio,
        hora_fin: this.selccion.data.hora_fin,
        _iddoctor: this.dataCita.doctor._id,
        especialidad: this.dataCita.especialidad.especialidad,
      };

      console.log(datos);
      this.actualizarCitaPacienteTitular({
        paciente: this.getUsuario,
        newCita: datos,
      }).then((res) => {
        this.recargarHorario()
        this.recargarCalendario()
          this.showLoader = false
          this.showAlert = true
      });
    },

    recargarHorario() {
    console.log("recargaaaaaaaaaaaaaa")
      this.$emit("recargarHorario");
    },

    recargarCalendario(){
        console.log("recargaaaaaaaaaaaaaa")
        this.$emit("recargarCalendario");
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
      this.events = [];
      const events = [];
      for (let i = 0; i < this.dataTime.length; i++) {
        const first =
          this.dataTime[i].fecha + " " + this.dataTime[i].hora_inicio;
        const second = this.dataTime[i].fecha + " " + this.dataTime[i].hora_fin;
        const data = this.dataTime[i];
        events.push({
          name: "Disponible.",
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          data: data,
          inicio: this.dataTime[i].hora_inicio,
          fin: this.dataTime[i].hora_fin,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },

  computed: {
    ...mapGetters(["getUsuario", "getAlert"]),
  },

  inject: {
    theme: {
      default: { isDark: false },
    },
  },
};
</script>
