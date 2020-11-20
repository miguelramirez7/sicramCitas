const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000/api';

const state = {
    pacientePerfil: null // VARIABLE PARA LOS DATOS DEL PACIENTE
};

const getters = {
    getPacientePerfil(state){
        return state.pacientePerfil
    }
};

const mutations = {
    setPacientePerfil(state,payload){
        state.pacientePerfil = payload
    }
};
 
const actions = {
    //CONSULTA PARA CONSEGUIR LOS DATOS DEL PACIENTE.
    registrarPaciente({commit,dispatch},datos){
        return axios
            .post("/signupuser",{...datos})
            .then((res)=>{
                console.log(res.data.msg)
                if(res.data.msg == "Usuario registrado exitosamente!"){
                    dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'success'} , { root: true })
                }else{
                    dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'warning'} , { root: true })
                }
                
                return Promise.resolve(true)
            })
            .catch((e)=>{
                console.log(e)
                dispatch('mensajeTipoAlert', {mensajeAlerta:"Este correo está en uso." ,tipoAlerta:'error'} , { root: true })
                return Promise.resolve(false)
            })
    },

    //CONSULTA PARA CONSEGUIR LOS DATOS DEL PERFIL DEL PACIENTE.
    perfilPaciente({commit,dispatch},paciente){
        let url =
        `/user/perfil/${paciente.id}`;
        axios
        .get(url, {
          headers: {
            Authorization: `${paciente.token}`,
          },
        })
        .then((res)=>{
            console.log("DATOS PACIENTE: ", res.data)
            commit('setPacientePerfil',res.data)
            dispatch('leerUsuario',null, { root: true });
        })
        .catch((e)=>{
            console.log(e)
        })
    },

    //CONSULTA PARA ACTUALIZAR LOS DATOS DEL PACIENTE
    actualizarPaciente({commit,dispatch},datos){
        let url = `/user/perfil/update/${datos.paciente.id}`;
        return axios
          .post(
            url,
            { ...datos.newDatos },
            {
              headers: {
                Authorization: `${datos.paciente.token}`,
              },
            }
          )
        .then((res)=>{
            console.log(res)
            dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'success'} , { root: true })
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