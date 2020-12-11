const axios = require('axios');
axios.defaults.baseURL = 'https://sicramtest.herokuapp.com/api';

const state = {
    pacientePerfil: null // VARIABLE PARA LOS DATOS DEL PACIENTE
};

const getters = {
    //PARA CONSEGUIR LOS DATOS DEL PERFIL DEL PACIENTE
    getPacientePerfil(state){
        return state.pacientePerfil
    }
};

const mutations = {
    //PONE LOS DATOS DEL PERFIL DEL PACIENTE
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

    //CONSULTA PARA REGISTRAR UN HORARIO AL PACIENTE TITULAR
    registrarCitaTitular({commit,dispatch},datos){
        let url = `/user/cita/crear/${datos.paciente.id}`;
        return axios
          .post(
            url,
            { ...datos.cita },
            {
              headers: {
                Authorization: `${datos.paciente.token}`,
              },
            }
          )
        .then((res)=>{
            console.log(res)
            if(res.data.msg === "Exito nueva cita creada."){
                dispatch('mensajeTipoAlert', {mensajeAlerta:"Se ha creado la cita correctamente." ,tipoAlerta:'success'} , { root: true });
                return Promise.resolve(true) 
            }else{
                dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'warning'} , { root: true })
                return Promise.resolve(false) 
            }
        })
        .catch((e)=>{
            console.log(e)
            dispatch('mensajeTipoAlert', {mensajeAlerta:"Error al crear la cita.",tipoAlerta:'error'} , { root: true })
            return Promise.resolve(false)
        })
    },

    //CONSULTA PARA REGISTRAR UN HORARIO AL PACIENTE DEPENDIENTE
    registrarCitaDependiente({commit}){

    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}