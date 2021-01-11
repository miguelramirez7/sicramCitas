<template>
  <div>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card class="pa-2" tile height="480">
          <v-card-text>
            <p class="display-1 text--primary">
              Nueva cita
            </p>
            <v-form>
              <v-col cols="12" sm="12">
                <v-select
                  append-outer-icon="mdi-account-box-multiple"
                  :items="['Titular', 'Dependiente']"
                  label="Tipo de Paciente*"
                  required
                  color="cyan"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  :items="['Titular', 'Dependiente']"
                  append-outer-icon="mdi-book-account-outline"
                  label="Especialidad*"
                  required
                  color="cyan"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  :items="['Titular', 'Dependiente']"
                  label="Doctor*"
                  required
                  color="cyan"
                  append-outer-icon="mdi-doctor"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" justify-center>
                <v-btn block color="teal" dark>
                  <v-icon>mdi-plus</v-icon>Agregar</v-btn
                >
              </v-col>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card class="pa-2" tile>
          <HorarioDoctor/>
        </v-card>
      </v-col>
    </v-row>
    <CitasPendientesPac />
  </div>
</template>

<script>
import CitasPendientesPac from "./CitasPendientesPac.vue";
import HorarioDoctor from "./HorarioDoctor.vue";
export default {
  components: {
    CitasPendientesPac,
    HorarioDoctor
  },
  
};
</script>

<style></style>
