<template>
  <div >
      <img class="imagen-const" v-if="tipoDeImagen == 'construccion'" src="@/assets/enConstruccion.jpg" >
      <img class="imagen-const" v-if="tipoDeImagen != 'construccion'" src="@/assets/noEncontrado.jpg" >
  </div>
</template>

<script>
export default {
    name: 'EnConstruccion',
    props:{
        tipoDeImagen: {
            type: String,
            default : "construccion",
        }
    },
}
</script>

<style scoped>

.imagen-const{
    top: -12vh;
    left: -5vh;
    position: absolute;
    height: 100vh;
    
}

</style>