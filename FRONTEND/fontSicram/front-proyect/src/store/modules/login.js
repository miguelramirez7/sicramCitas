const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:3000/api';
const state = {
    
};

const getters = {
    
};

const mutations = {

};

const actions = {
    //INICIAR SESION DOCTOR 
    loginDoctor({commit},doctor){
        return axios
        .post("/signindoctor",{
          ...doctor
        })
        .then((res)=>{
            console.log("DOCTOR: ",res.data)
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
    loginPaciente({commit },paciente){
       
        return axios
        .post("/signinuser",{
          ...paciente
        })
        .then((res)=>{
            console.log("PACIENTE : ",res.data)
            return Promise.resolve(true)
        })

        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
}