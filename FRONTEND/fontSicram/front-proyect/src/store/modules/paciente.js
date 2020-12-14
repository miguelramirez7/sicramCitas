const axios = require('axios');
//axios.defaults.baseURL = 'https://sicramtest.herokuapp.com/api';

const state = {
    pacientePerfil: null, // VARIABLE PARA LOS DATOS DEL PACIENTE
    citasPendientesTitular: null, // VARIABLE PARA LAS CITAS PENDIENTE DEL PACIENTE TITULAR
    citasPendientesDependiente: null, // VARIABLE PARA LAS CITAS PENDIENTES DEL PACIENTE DEPENDIENTE
    listaDependientes: null // VARIABLE PARA LA LISTA DE DEPENDIENTES
};

const getters = {
    //PARA CONSEGUIR LOS DATOS DEL PERFIL DEL PACIENTE
    getPacientePerfil(state){
        return state.pacientePerfil
    },
    //PARA CONSEGUIR LAS CITAS PENDIENTES DEL PACIENTE TITULAR
    getCitasPendientesTitular(state){
        return state.citasPendientesTitular
    },
    //PARA CONSEGUIR LAS CITAS PENDIENTES DEL PACIENTE DEPENDIENTE
    getCitasPendientesDependiente(state){
      return state.citasPendientesDependiente
    },
    //PARA CONSEGUIR LA LISTA DE LOS DEPENDIENTES
    getListaDependientes(state){
      return state.listaDependientes
    }
};

const mutations = {
    //PONE LOS DATOS DEL PERFIL DEL PACIENTE
    setPacientePerfil(state,payload){
        state.pacientePerfil = payload
    },

    //PONE LAS CITAS PENDIENTES DEL TITULAR
    setCitasPendientesTitular(state,payload){
        state.citasPendientesTitular = payload
    },

    //PONE LAS CITAS PENDIENTES DEL DEPENDIENTE
    setCitasPendientesDependiente(state ,payload){
      state.citasPendientesDependiente = payload
    },

    //PONE LA LISTA DE LOS DEPENDIENTES
    setListaDependientes(state,payload){
      state.listaDependientes = payload
    }
};

const actions = {

    //CONSULTA PARA CONSEGUIR LOS DATOS DEL PACIENTE.
    registrarPaciente({ commit, dispatch }, datos) {
        return axios
            .post("/signupuser", {...datos })
            .then((res) => {
                console.log(res.data.msg)
                if (res.data.msg == "Usuario registrado exitosamente!") {
                    dispatch('mensajeTipoAlert', { mensajeAlerta: res.data.msg, tipoAlerta: 'success' }, { root: true })
                } else {
                    dispatch('mensajeTipoAlert', { mensajeAlerta: res.data.msg, tipoAlerta: 'warning' }, { root: true })
                }

                return Promise.resolve(true)
            })
            .catch((e) => {
                console.log(e)
                dispatch('mensajeTipoAlert', { mensajeAlerta: "Este correo está en uso.", tipoAlerta: 'error' }, { root: true })
                return Promise.resolve(false)
            })
    },

    //CONSULTA PARA CONSEGUIR LOS DATOS DEL PERFIL DEL PACIENTE.
    perfilPaciente({ commit, dispatch }, paciente) {
        let url =
            `/user/perfil/${paciente.id}`;
        axios
            .get(url, {
                headers: {
                    Authorization: `${paciente.token}`,
                },
            })
            .then((res) => {
                console.log("DATOS PACIENTE: ", res.data)
                commit('setPacientePerfil', res.data)
                dispatch('leerUsuario', null, { root: true });
            })
            .catch((e) => {
                console.log(e)
            })
    },

    //CONSULTA PARA ACTUALIZAR LOS DATOS DEL PACIENTE
    actualizarPaciente({ commit, dispatch }, datos) {
        let url = `/user/perfil/update/${datos.paciente.id}`;
        return axios
            .post(
                url, {...datos.newDatos }, {
                    headers: {
                        Authorization: `${datos.paciente.token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                dispatch('mensajeTipoAlert', { mensajeAlerta: res.data.msg, tipoAlerta: 'success' }, { root: true })
                return Promise.resolve(true)
            })
            .catch((e) => {
                console.log(e)
                return Promise.resolve(false)
            })
    },

    //REGISTRA UN FAMILIAR DEPENDIENTE
    registrarFamiliar({ commit, dispatch }, datos) {
        return axios
            .post(`/user/dependiente/agregar/${datos.paciente.id}`, {...datos.dependiente }, {
                headers: {
                    Authorization: `${datos.paciente.token}`,
                },
            })
            .then((res) => {
                console.log(res.data.msg)
                if (res.data.msg == "Nuevo dependiente guardado") {
                    dispatch('mensajeTipoAlert', { mensajeAlerta: res.data.msg, tipoAlerta: 'success' }, { root: true })
                } else {
                    dispatch('mensajeTipoAlert', { mensajeAlerta: res.data.msg, tipoAlerta: 'warning' }, { root: true })
                }

                return Promise.resolve(true)
            })
            .catch((e) => {
                console.log(e)
                dispatch('mensajeTipoAlert', { mensajeAlerta: 'OCURRIO UN ERROR', tipoAlerta: 'error' }, { root: true })


                return Promise.resolve(false)
            })
    },

    //CONSULTA PARA LISTAR LOS DEPENDIENTES
    listarDependientes({commit,dispatch},paciente){
      return axios
            .get(`/user/dependiente/listar/${paciente.id}`,{
              headers: {
                Authorization: `${paciente.token}`,
              },
            })

        .then((res) => {
            console.log(res)
            if(res.data.length!=0){
                commit('setListaDependientes',null)
                console.log("si tiene DEPENDIENTES")
                commit('setListaDependientes',res.data)
                
            }else{
              commit('setListaDependientes',null)
            
            }
            return Promise.resolve(true)
            
        })
        .catch((e) => {
            console.log(e)
            return Promise.resolve(false)
        });
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
    registrarCitaDependiente({commit,dispatch},datos){
      let url = `/user/dependiente/cita/crear/${datos.id_dependiente}`;
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

    //CONSULTA PARA CONSEGUIR LA LISTA DE CITAS DEL PACIENTE TITULAR
    listarCitasPendientesTitular({commit},paciente){
        let url = `/user/cita/listar/${paciente.id}`;
        return axios
          .get(
            url,
            {
              headers: {
                Authorization: `${paciente.token}`,
              },
            }
          )
        .then((res)=>{
            console.log(res)
            commit('setCitasPendientesTitular',res.data)
            return Promise.resolve(true)
        })
        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
    },

     //CONSULTA PARA CONSEGUIR LA LISTA DE CITAS DEL PACIENTE DEPENDIENTE
     listarCitasPendientesDependiente({commit},datos){
      let url = `/user/dependiente/citas/${datos.id_dependiente}`;
      return axios
        .get(
          url,
          {
            headers: {
              Authorization: `${datos.paciente.token}`,
            },
          }
        )
      .then((res)=>{
          console.log(res)
          commit('setCitasPendientesDependiente',res.data)
          return Promise.resolve(true)
      })
      .catch((e)=>{
          console.log(e)
          return Promise.resolve(false)
      })
    },

    //CONSULTA PARA ACTUALIZAR LA CITA PENDIENTE DEL PACIENTE
    actualizarCitaPacienteTitular({commit,dispatch},datos){
      let url = `/user/cita/actualizar/${datos.paciente.id}`;
        return axios
          .post(
            url,
            { ...datos.newCita },
            {
              headers: {
                Authorization: `${datos.paciente.token}`,
              },
            }
          )
        .then((res)=>{
            console.log(res)
            if(res.data.msg==="Cita actualizada"){
              dispatch('mensajeTipoAlert', {mensajeAlerta:"Cita actualizada Correctamente",tipoAlerta:'success'} , { root: true })
              return Promise.resolve(true)
            }else{
              dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'warning'} , { root: true })
              return Promise.resolve(true)
            }

        })
        .catch((e)=>{
            console.log(e)
            dispatch('mensajeTipoAlert', {mensajeAlerta:"Ocurrio un error en la actualizacion",tipoAlerta:'error'} , { root: true })
            return Promise.resolve(false)
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}