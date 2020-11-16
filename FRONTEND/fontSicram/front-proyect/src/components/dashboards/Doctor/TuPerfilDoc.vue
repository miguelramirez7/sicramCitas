<template>
  <div class="">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="d-flex justify-center align-center">
          <v-avatar size="180">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-col>
        <v-col cols="12" md="5">
          <v-card elevation="4" class="mt-5">
            <v-card-title class="titulo">Información Personal</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" md="6">
                  <p class="font-weight-bold">NOMBRES Y APELLIDOS:</p>
                  <p class="font-weight-bold">DNI:</p>
                  <p class="font-weight-bold">EDAD:</p>
                  <p class="font-weight-bold">GENERO:</p>
                  <p class="font-weight-bold">CELULAR:</p>
                  <p class="font-weight-bold">CMP:</p>
                  <p class="font-weight-bold">ESPECIALIDAD:</p>
                </v-col>
                <v-col cols="6" md="6">
                  <p>{{getDoctorPerfil.name}} {{getDoctorPerfil.lastname}}</p>
                  <p>{{getDoctorPerfil.dni}}</p>
                  <p>{{getDoctorPerfil.edad}}</p>
                  <p>{{getDoctorPerfil.genero}}</p>
                  <p>{{getDoctorPerfil.celular}}</p>
                  <p>{{getDoctorPerfil.cmp}}</p>
                  <p>{{getDoctorPerfil.especialidad.especialidad}}</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'TuPerfilDoc',
    computed:{
        ...mapGetters(['getDoctorPerfil'])
    }


};
</script>

<style scoped>
.v-card__title {
  justify-content: center;
  font-size: 1.7rem;
  font-weight: 600;
  color: rgb(8, 150, 114);
}
</style>
