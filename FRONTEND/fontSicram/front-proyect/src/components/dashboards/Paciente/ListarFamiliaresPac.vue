<template>
    <div class="">
         <!---------------MODALES---------------------->
    <EditarDependiente :dialog="editarDependienteDialog" :datos="dependiente" @close=" editarDependienteDialog=false " />
         <section class="listaPropiedad" v-for="(elemento,index) in listaDependientes" :key="index">
                <div class="row">
                    <div class="col-md-3 d-flex justify-content-center align-items-center">
                        <img src="../../../assets/user.svg" style="width: 100px; height: 100px; border-radius: 10px; border:2px solid grey"  alt="">
                        
                    </div>
                    <div class="col-md-6 datos" >
                        <h5 class="mt-2">NOMBRE {{elemento.nombre}}</h5>
                        <span style="font-size:12px;" >dni  {{elemento.dni}}</span></br>
                        <span style="font-size:12px;" >EDAD {{elemento.edad}}</span></br>
                        <span style="font-size:12px;" >CELULAR {{elemento.celular}}</span></br>
                        
                        <span style="font-size:12px;" >GENERO {{elemento.genero}}</span>
                    </div>
                    <div class="col-md-3 botonesPRO">
                        <button class="boton-editar botonPRO" @click="editar(elemento)"><i class="fas fa-bars mr-2"></i>Editar</button>
                        <button class="boton-eliminar botonPRO"><i class="fas fa-times mr-2"></i>Eliminar</button>
                    </div>
                </div>
           
        </section>
    </div>
   
</template>

<script>
import EditarDependiente from './modals/EditarDependiente.vue'
export default {
    data(){
        return{
            editarDependienteDialog : false,
            dependiente: {
                name: 'jorge',       
                lastname: 'nuñez',
                email:'email1@email.com',    //
                genero: '',
                edad: '12',
                discapacidad:'ninguna',   //
                celular:'',
                direccion: 'ninguna',  //
                dni: '98655421',
            },
            listaDependientes : [{
                name: 'jorge',       
                lastname: 'nuñez',
                email:'email1@email.com',    //
                genero: '',
                edad: '',
                discapacidad:'ninguna',   //
                celular:'',
                direccion: 'ninguna',  //
                dni: '',
            },{
                name: 'julia',       
                lastname: 'lopez',
                email:'email1@email.com',    //
                genero: '',
                edad: '',
                discapacidad:'ninguna',   //
                celular:'',
                direccion: 'ninguna',  //
                dni: '',
            }]
        }
    },
    components:{
        EditarDependiente
    },
    methods:{
        editar(elemento){
            this.editarDependienteDialog = !this.editarDependienteDialog
            this.dependiente = elemento
        }
    }
}
</script>

<style scoped>
    @import '../../../assets/css/listarDependiente.css';
</style>