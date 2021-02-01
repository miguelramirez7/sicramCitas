<template>
  <div>
    <!---MODALS------->
    <editar-cita-pendiente
      :dialog="showEdit"
      :cita="citaEditar"
      @close="showEdit = false"
      @recargaCalendar="recargar"
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
    <!---QUESTIONER -------->
    <questioner
    :dialog="showQuestioner"
      @close="showQuestioner = false"
      :title="'ELIMINAR CITA'"
      :message="'¿Está seguro de que desea aliminar este cita?'"
      @accept="eliminarItem" 
    />
    <v-row class="fill-height">
      <v-col>
        <div v-if="showNodata == true">
          <v-alert text prominent type="error" icon="mdi-cloud-alert">
            Al parecer aún no ha registrado citas, le recomendamos registrarla en la sección <strong>Nueva Cita!</strong>
          </v-alert>
        </div>
        <v-sheet
          :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
          v-if="showEskeletor == true"
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
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" width="500px" flat class="pa-0">
              <v-toolbar :color="selectedEvent.color" dark class="pa-0">
                <v-toolbar-title v-html="'CITA PENDIENTE'"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="editar(selectedEvent)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="eliminar(selectedEvent)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn icon @click="selectedOpen = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-row>
                  <v-col sm="5" md="5" style="color: black;">
                    Doctor:
                  </v-col>
                  <v-col sm="7" md="7" style="color: black;">
                    {{ selectedEvent.doctorName }}
                    {{ selectedEvent.doctorLastname }}
                  </v-col>
                  <v-col sm="5" md="5" style="color: black;">
                    Especialidad:
                  </v-col>
                  <v-col sm="7" md="7" style="color: black;">
                    {{ selectedEvent.especialidad }}
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
import Questioner from "@/modals/Questioner.vue";
import EditarCitaPendiente from "./modals/EditarCitaPendiente.vue";
import { mapActions, mapGetters } from "vuex";
import RegistrarSintomas from "./modals/RegistrarSintomas.vue";

export default {
  name: "CitasPendientesPacCalendar",
  components: {
    EditarCitaPendiente,
    RegistrarSintomas,
    Alert,
    Loader,
    Questioner
  },
  props: {
    paciente: {
      type: Object,
      default: {
        tipoPaciente: "titular",
        datos: null,
      },
    },
  },
  data: () => ({
    idCita: null,
    idDoctor: null,
    citaEditar: {
      doctor: {
        name: "Nombre",
        lastname: "Apellido",
      },
    },
    showQuestioner : false,
    showNodata: false,
    showEskeletor: false,
    showSintomas: false, //MUESTRA EL MODAL PARA REGISTRAR SINTOMAS
    showEdit: false, //MUESTRA EL MODAL DE EDITAR CITA
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
    ...mapActions([
      "listarCitasPendientesTitular",
      "listarCitasPendientesDependiente",
      "eliminarCitaTitular"
    ]),
    //INGRESA A LA CITA SELECCIONADA
    ingresarCita(e) {
      this.idCita = e.data._id;
      this.showSintomas = true;
      this.idDoctor = e.data.doctor._id;
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
          console.log(this.dataPacientes);
          this.showEskeletor = false;
          if (this.dataPacientes == null) this.showNodata = true;
        });
      }
    },
    //EDITA LA CITA
    editar(event) {
      this.selectedOpen = false;
      this.selccion = event;
      this.citaEditar = this.selccion.data;
      this.showEdit = true;
      console.log(this.citaEditar);
    },

    eliminar(event){
      this.selccion = event;
      this.showQuestioner= true
    },

    eliminarItem(){
      this.showQuestioner= false
      const datos = {
        paciente: this.getUsuario,
        id_cita: this.selccion.data._id
      }
      this.showLoader = true,
      this.eliminarCitaTitular(datos)
      .then(res=>{
        this.showLoader = false,
        this.showAlert = true
        this.userType()
      })
    },

    //RECARGAR
    recargar() {
      this.userType();
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
      //console.log("los horarios son:", this.events);
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
        const doctorName = dataTime[i].doctor.name;
        const doctorLastname = dataTime[i].doctor.lastname;
        const especialidad = dataTime[i].especialidad.especialidad;
        events.push({
          name: "Cita pendiente",
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          data: data,
          doctorName: doctorName,
          doctorLastname: doctorLastname,
          especialidad: especialidad,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },

  computed: {
    ...mapGetters([
      "getUsuario",
      "getAlert",
      "getCitasPendientesTitular",
      "getCitasPendientesDependiente",
    ]),
  },

  watch: {
    paciente: {
      handler: function(val, oldVal) {
        console.log("nuevo:", val);
        console.log("viejo:", oldVal);
        if (val.vista == "Bandeja") {
          this.userType();
          this.updateRange; // call it in the context of your component object
        }
      },
    },
  },

  inject: {
    theme: {
      default: { isDark: false },
    },
  },
};
</script>
