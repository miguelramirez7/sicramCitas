<template>
  <div>
    <!----CARGADOR---->
    <Loader :dialog="showLoader" />
    <!----ALERTA---->
    <Alert
      :dialog="showAlert"
      @close="showAlert = false"
      :mensaje="alerta.mensajeAlerta"
      :tipo="alerta.tipoAlerta"
    />
    <v-row>
      <v-col cols="12" sm="4">
        <v-card class="pa-2" tile height="480">
          <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="registrarCita">
              <v-col cols="12" sm="12">
                <v-select
                  append-outer-icon="mdi-account-box-multiple"
                  :items="['Titular', 'Dependiente']"
                  label="Tipo de Paciente*"
                  v-model="tipoPaciente"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido]"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  append-outer-icon="mdi-account-box-multiple"
                  :items="['Dependiente1', 'Dependiente2']"
                  label="Paciente Dependiente*"
                  :disabled="pacientesDependientes"
                  color="cyan"
                  v-model="dependiente"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  :items="especialidades"
                  item-text="especialidad"
                  append-outer-icon="mdi-book-account-outline"
                  label="Especialidad*"
                  required
                  color="cyan"
                  :rules="[getReglas.requerido]"
                  v-model="newCita.especialidad"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  :items="['Titular', 'Dependiente']"
                  label="Doctor*"
                  required
                  color="cyan"
                  append-outer-icon="mdi-doctor"
                  :rules="[getReglas.requerido]"
                  v-model="newCita.doctor"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" justify-center>
                <v-btn block color="teal" dark type="submit">
                  <v-icon>mdi-plus</v-icon>Agregar</v-btn
                >
              </v-col>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card class="pa-2" tile>
          <HorarioDoctor />
        </v-card>
      </v-col>
    </v-row>
    <CitasPendientesPac />
  </div>
</template>

<script>
import Loader from "@/modals/Loader.vue";
import Alert from "@/modals/Alert.vue";
import { mapActions, mapGetters } from "vuex";
import CitasPendientesPac from "./CitasPendientesPac.vue";
import HorarioDoctor from "./HorarioDoctor.vue";
export default {
  name: "NuevaCitaPac",
  components: {
    CitasPendientesPac,
    HorarioDoctor,
    Loader,
    Alert,
  },
  data() {
    return {
      showLoader: false, //MUESTRA EL CARGADOR DESPUES DE REGISTRAR
      showAlert: false, //MUESTRA LA ALERTA DESPUES DEL REGISTRO
      alerta: {
        mensajeAlerta: "",
        tipoAlerta: "",
      },
      tipoPaciente: "",
      newCita: {
        paciente: "",
        especialidad: "",
        doctor: "",
      },
      dependiente: "",
    };
  },

  computed: {
    ...mapGetters(["getReglas", "getEspecialidades"]),
    pacientesDependientes() {
      if (this.tipoPaciente === "Dependiente") return false;
      return true;
    },

    especialidades() {
      if (this.getEspecialidades == null) return [];
      else return this.getEspecialidades;
    },
  },

  methods: {
    ...mapActions(["listaEspecialidades"]),
    //PARA REGISTRAR LA CITA
    registrarCita() {
      if (this.$refs.form.validate()) {
        console.log(this.newCita);
        if (this.tipoPaciente === "Dependiente")
          this.registrarCitaDependiente();
        else this.registrarCitaTitular();
      } else {
        console.log("registra mal");
      }
    },

    //REGISTRA LA CITA DEL DEPENDIENTE
    registrarCitaDependiente() {
      if (this.dependiente == "") {
        this.alerta.mensajeAlerta = "Seleccione un dependiente.";
        this.alerta.tipoAlerta = "warning";
        this.showAlert = true;
      } else {
        this.newCita.dependiente = this.dependiente;
        //LLAMA A LA FUNCION DE CREAR CITA PARA EL PACIENTE DEPENDIENTE
      }
    },

    //REGISTRA LA CITA DEL TITULAR
    registrarCitaTitular() {
      //LLAMA A LA FUNCION DE CREAR CITA DEL TITULAR
    },
  },

  created() {
    this.listaEspecialidades();
  },
};
</script>

<style></style>
