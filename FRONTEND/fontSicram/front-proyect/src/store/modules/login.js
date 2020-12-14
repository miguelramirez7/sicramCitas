const axios = require('axios')
//axios.defaults.baseURL = 'https://sicramtest.herokuapp.com/api';
const state = {
    user: null, //TOKEN Y ID DEL USUARIO
    tipoUser: null,
    
};

const getters = {
    //CONSEGUIR ID Y TOKEN DEL USUARIO
    getUsuario(state){
        return state.user
    },
    
    
    //CONSEGUIR TIPO DE USUARIO 
    getTipoUsuario(state){
        return state.tipoUser
    }
};

const mutations = {
    //PONE AL USUARIO
    setUsuario(state,payload){
        state.user = payload
    },
    
    //PONER TIPO DE USUARIO
    setTipoUsuario(state,payload){
        state.tipoUser = payload
    }
};

const actions = {
    //INICIAR SESION DOCTOR 
    loginDoctor({commit,dispatch},doctor){
        return axios
        .post("/signindoctor",{
          ...doctor
        })
        .then((res)=>{
            dispatch('guardarUsuario',res.data);
            dispatch('guardarTipoDeUsuario','doctor');
            console.log("DOCTOR: ",res.data)
            dispatch('perfilDoctor', res.data , { root: true })
            return Promise.resolve(true)
        })

        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
    },

    //INICIAR SESION ORGANIZACION
    loginOrganizacion({commit,dispatch },organizacion){
        
        /*return axios 
        .post("/signinorganizacion",{
          ...organizacion
        })
        .then((res)=>{
            console.log("ORGANIZACION : ",res.data)
            dispatch('guardarTipoDeUsuario','organizacion');
            dispatch('guardarUsuario',res.data);
            dispatch('perfilOrganizacion', res.data , { root: true })
            
            return Promise.resolve(true)
        })

        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })*/
       
    },

    //INICIAR SESION PACIENTE
    loginPaciente({commit,dispatch },paciente){
        return axios
        .post("/signinuser",{
          ...paciente
        })
        .then((res)=>{
            dispatch('guardarUsuario',res.data);
            dispatch('guardarTipoDeUsuario','paciente');
            dispatch('perfilPaciente', res.data , { root: true })
            console.log("PACIENTE : ",res.data)
            
            return Promise.resolve(true)
        })

        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
    },

    //GUARDAR EL ROL DE USUARIO
    guardarTipoDeUsuario({commit},payload){
        localStorage.setItem('tipoUser',payload)
        commit('setTipoUsuario',payload)
    },

    //GUADAR USUARIO EN EL LOCALSTORAGE
    guardarUsuario({commit},payload){
        localStorage.setItem('user',JSON.stringify(payload))
        commit('setUsuario',payload)
    },

    //VER SI USUARIO SE ENCUENTRA LOGEADO
    leerUsuario({commit,dispatch}){
        const user = JSON.parse(localStorage.getItem('user'))
        const tipoUser =  localStorage.getItem('tipoUser')
        //if(user){
            dispatch('guardarUsuario',user)
            dispatch('guardarTipoDeUsuario',tipoUser)
          //  switch(tipoUser){
          //    case 'paciente' : dispatch('getPerfilPaciente', user , { root: true }); break;
            //    case 'doctor':  dispatch('perfilDoctor', user , { root: true });break;
            //    case 'organizacion':  dispatch('perfilOrganizacion', user , { root: true });break;
            //}
        //}else{
        //    commit('setUsuario',null)
        //    commit('setTipoUsuario',null)
        //}*/
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
}