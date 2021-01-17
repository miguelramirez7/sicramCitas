<template>
   <div class="d-flex justify-center flex-column align-center" > 
        <h1 class="text-center">BIENVENIDO(A) A SICRAM</h1>
        <h3>Consultorio de citas médicas</h3>
        <v-container>
            <v-row>
                <v-col cols="12" md="6" class="imagenBienvenida pr-3" >
                    <img src="../../../assets/bienvenida.jpg" alt="">
                </v-col>
                <v-col cols="12" md="6" class="contenidoBienvenida ">
                    <div class="">
                        <p><span class="guinBienvenida">-</span> <span class="font-weight-bold">¿Quiénes somos?</span> </p>
                    <span  class="letrasIni">En 2020, el virus covid-19 afecto a gran parte del Perú,provocando a escala nacional una pandemia.Debido a esto junto con 6 estudiantes desarrolladores de software decidimos crear el grupo SICRAM, el cual reunía los años de experiencia e ideas de innovación para crear software enfocado en el sector salud que pueda ayudar a la sociedad afectada. El equipo SICRAM se encuentra formado por 6 estudiantes de la UNMSM de la carrera de ingeniería de software con experiencia en desarrollo y innovación de software garantizado por el historial académico que proporciona la universidad.</span>
                    </div>
                    
                    <div class="">
                        <p>  <span class="guinBienvenida">-</span> <span class="font-weight-bold">¿Qué hacemos?</span> </p>
                    <span class="letrasIni">Todos nuestros recursos, conocimiento e investigaciones están dedicados a poder ser los mejores para ese paciente,médico u organización y otorgarles la mejor plataforma de atención médica virtual.</span>
                    </div>
                  
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@import "../../../assets/css/paciente.css";
</style>