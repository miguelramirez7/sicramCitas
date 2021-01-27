const axios = require('axios')
//BASE URL POR DEFAULT EN LOCAL HOST 
axios.defaults.baseURL = 'http://localhost:3000/api'; 
//axios.defaults.baseURL = 'https://sicramtest.herokuapp.com/api';

const state = {
    doctorPerfil: null, // VARIABLE PARA LOS DATOS DEL DOCTOR
    horariosDesocupados: null, // VARUABLE PARA LOS HORARIOS DEL DOCTOR
    especialidades: null, // VARIABLE PARA LA LISTA DE LAS ESPECIALIDADES
    listaDoctoresPorEspecialidad : null, // VARIABLE PARA LA LISTA DE DOCTORES POR ESPECIALIDAD
    citasPendientes: null, // VARIABLE PARA LA LISTA DE CITAS PENDIENTES
};

const getters = {
    //CONSIGUE EL PERFIL DEL DOCTOR
    getDoctorPerfil(state) {
        return state.doctorPerfil
    },

    //CONSIGUE LOS HORARIOS DESOCUPADOS DEL DOCTOR
    getHorariosDesocupados(state) {
        return state.horariosDesocupados
    },

    //CONSIGUE LAS ESPECIALIDADES
    getEspecialidades(state){
        return state.especialidades
    },

    getListaDoctoresPorEspecialidad(state){
        return state.listaDoctoresPorEspecialidad
    },

    //CONSEGUIR LAS CITAS PENDIENTES

    getCitasPendientes(state){
        return state.citasPendientes
    }

};

const mutations = {
    //PONE LOS DATOS DEL PERFIL DEL DOCTOR
    setDoctorPerfil(state, payload) {
        state.doctorPerfil = payload
    },

    //PONE LOS HORARIOS DESOCUPADOS DEL DOCTOR
    setHorariosDesocupados(state, payload) {
        state.horariosDesocupados = payload
    },

    //PONE LAS ESPECIALIDADES
    setEspecialidades(state,payload){
        state.especialidades = payload
    },

    //PONE LOS DOCTORES POR ESPECIALIDAD
    setListaDoctoresPorEspecialidad(state,payload){
        state.listaDoctoresPorEspecialidad = payload
    },

    //PONE LAS CITAS PENDIENTES
    setCitasPendientes(state,payload){
        state.citasPendientes=payload
    }

};

const actions = {
    //CONSULTA PARA REGISTRAR UN DOCTOR
    registrarDoctor({ commit, dispatch }, datos) {
        return axios
            .post("/signupdoctor", {...datos })
            .then((res) => {
                console.log(res.data.msg)
                if (res.data.msg == "Bienvenido Doctor, es un nuevo usuario.") {
                    dispatch('mensajeTipoAlert', { mensajeAlerta: res.data.msg, tipoAlerta: 'success' }, { root: true })
                    return Promise.resolve(true)
                } else {
                    dispatch('mensajeTipoAlert', { mensajeAlerta: res.data.msg, tipoAlerta: 'warning' }, { root: true })
                    return Promise.resolve(false)
                }
            })
            .catch((e) => {
                console.log(e)
                dispatch('mensajeTipoAlert', { mensajeAlerta: "Este correo está en uso.", tipoAlerta: 'error' }, { root: true })
                return Promise.resolve(false)
            })
    },

    //CONSULTA PARA CONSEGUIR EL PERFIL DEL DOCTOR
    perfilDoctor({ commit, dispatch }, doctor) {
        console.log(doctor)
        let url = `/doctor/perfil/${doctor.id}`;
        axios
            .get(url, {
                headers: {
                    Authorization: `${doctor.token}`,
                },
            })
            .then((res) => {
                console.log("DATOS DOCTOR: ", res.data)
                commit('setDoctorPerfil', res.data)
                //dispatch('leerUsuario', null, { root: true });
            })
            .catch((e) => {
                console.log(e)
            });
    },

    //CONSULTA PARA ACTUALIZAR EL PERFIL DEL DOCTOR
    actualizarDoctor({ commit, dispatch }, datos) {
        let url = `/doctor/perfil/update/${datos.doctor.id}`;
        return axios
          .post(
            url,
            { ...datos.newDatos },
            {
              headers: {
                Authorization: `${datos.doctor.token}`,
              },
            }
          )
          .then((res)=>{
            console.log(res)
            dispatch('mensajeTipoAlert', {mensajeAlerta:'Datos actualizados correctamente.',tipoAlerta:'success'} , { root: true })
            return Promise.resolve(true)
        })
        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
    },

    //CONSULTA PARA AGREGAR HORARIO AL DOCTOR
    registrarHorarioDoctor({ commit, dispatch }, datos) {

        let url = `/doctor/horario/agregar/${datos.doctor.id}`;
        return axios
            .post(
                url, {...datos.newHorario }, {
                    headers: {
                        Authorization: `${datos.doctor.token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                if (res.data.msg === "nuevo horario guardado") {
                    dispatch('listarHorariosDoctor', datos.doctor)
                    dispatch('mensajeTipoAlert', { mensajeAlerta: "Horario creado con éxito.", tipoAlerta: 'success' }, { root: true })
                    return Promise.resolve(true)
                } else {
                    dispatch('mensajeTipoAlert', { mensajeAlerta: res.data.msg, tipoAlerta: 'warning' }, { root: true })
                    return Promise.resolve(false)
                }

            })
            .catch((e) => {
                dispatch('mensajeTipoAlert', { mensajeAlerta: e, tipoAlerta: 'error' }, { root: true })
                return Promise.resolve(false)
            })
    },

    //CONSULTA PARA LISTAR LOS HORARIOS DEL DOCTOR
    listarHorariosDoctor({ commit }, doctor) {
         return axios
            .get(`/doctor/horarios/${doctor.id}`)

        .then((res) => {
            console.log(res)
            if(res.data.length!=0){
                commit('setHorariosDesocupados',null)
                console.log("si tiene horarios")
                commit('setHorariosDesocupados',res.data)
                
            }else{
              commit('setHorariosDesocupados',null)
            
            }
            return Promise.resolve(true)
            
        })
        .catch((e) => {
            console.log(e)
            return Promise.resolve(false)
        });
    },

    //MODIFICAR EL HORARIO DE DOCTOR
    modificarHorario({commit,dispatch},datos){
        let url = `/doctor/horario/modificar/${datos.doctor.id}`;
      return axios
        .post(
          url,
          { ...datos.newHorario },
          {
            headers: {
              Authorization: `${datos.doctor.token}`,
            },
          }
        )
        .then((res)=>{
          console.log(res)
              if(res.data.msg==="Horario actualizado!"){
                dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'success'} , { root: true })
                return Promise.resolve(true)
              }else{
                dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'warning'} , { root: true })
                return Promise.resolve(false)
              }
            
        })
        .catch((e)=>{
          console.log(e)
          dispatch('mensajeTipoAlert', {mensajeAlerta:"Ocurrió un error al actualizar el Horario." ,tipoAlerta:'error'} , { root: true })
          return Promise.resolve(false)
        })
    },

    //CONSULTA PARA ELIMINAR UN HORARIO SELECCIONADO POR EL DOCTOR
    eliminarHorario({commit,dispatch},datos){
      let url = `/doctor/horario/eliminar/${datos.doctor.id}`;
      return axios
        .post(
          url,
          { id_horario: datos.id_horario },
          {
            headers: {
              Authorization: `${datos.doctor.token}`,
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
          dispatch('mensajeTipoAlert', {mensajeAlerta:'Ocurrió un error al eliminar el horario.' ,tipoAlerta:'success'} , { root: true })
          return Promise.resolve(false)
        })
    },

    //CONSULTA PARA OBTENER LAS ESPECIALIDADES
    listaEspecialidades({commit}){
        let url = `/especialidad`;
         axios
        .get(url) 
        .then((res) => {
            console.log(res.data)
            commit('setEspecialidades', res.data)
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //CONSULTA PARA OBTENER EL LISTADO DE DOCTORES POR ESPECIALIDAD 
    listarDoctoresPorEspecialidad({commit},especialidad){
        let url = `/especialidad/doctores`;
        return axios
        .post("/especialidad/doctores", { especialidad : especialidad}, ) 
        .then((res) => {
            console.log(res.data)
            if(res.data.length ===0) commit('setListaDoctoresPorEspecialidad',null)
            else commit('setListaDoctoresPorEspecialidad',res.data)
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //CONSULTA PARA OBTENER LA LISTA DE CITAS PENDIENTES DEL DOCTOR
    listarCitasPendientes({commit,dispatch},doctor){
         return axios
            .get(`/doctor/cita/listar/${doctor.id}`,
            {
                headers: {
                  Authorization: `${doctor.token}`,
                },
              })

        .then((res) => {
            console.log(res)
            if(res.data.length!=0){
                commit('setCitasPendientes',null)
                console.log("si tiene horarios")
                commit('setCitasPendientes',res.data)
                
            }else{
              commit('setCitasPendientes',null)
            
            }
            return Promise.resolve(true)
            
        })
        .catch((e) => {
            console.log(e)
            return Promise.resolve(false)
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}