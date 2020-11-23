 <template>
   <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>4<span class="mx-5 "></span>4</h1>
			</div>
			<h2>Oops! Página no encontrada</h2>
			<v-btn  @click="$router.go(-1)"   >Regresar</v-btn>
		</div>
	</div>
 </template>
 
 <script>
 export default {
 
 }
 </script>
 
 <style scoped>
@import '../assets/css/error404.css';
 </style>