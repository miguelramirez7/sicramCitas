const axios = require('axios')
//BASE URL POR DEFAULT EN LOCAL HOST 
//axios.defaults.baseURL = 'http://localhost:3000/api'; 
axios.defaults.baseURL = 'https://sicramtest.herokuapp.com/api';

const state = {
    doctorPerfil: null, // VARIABLE PARA LOS DATOS DEL DOCTOR
    horariosDesocupados: null, // VARUABLE PARA LOS HORARIOS DEL DOCTOR
    horariosOcupados: null, // VARIABLE PARA LOS HORARIOS OCUPADOS DEL DOCTOR
    especialidades: null, // VARIABLE PARA LA LISTA DE LAS ESPECIALIDADES
    listaDoctoresPorEspecialidad : null, // VARIABLE PARA LA LISTA DE DOCTORES POR ESPECIALIDAD
    citasPendientes: null, // VARIABLE PARA LA LISTA DE CITAS PENDIENTES
    citasAtendidas: null, // VARIABLE PARA LA LISTA DE CITAS ATENDIDAS
    dataSintomasPaciente : null, // VARIABLE PARA OBTENER SINTOMAS DEL PACIENTE
    historialPaciente: null //VARIABLE PARA OBTENER EL HISTORIAL DEL PACIENTE
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

    //CONSIGUE LOS HORARIOS OCUPADOS DEL DOCTOR
    getHorariosOcupados(state) {
      return state.horariosOcupados
    },

    //CONSIGUE LAS ESPECIALIDADES
    getEspecialidades(state){
        return state.especialidades
    },

    //CONSIGUE LA LISTA DE LOS DOCTORES POR ESPECIALIDAD
    getListaDoctoresPorEspecialidad(state){
        return state.listaDoctoresPorEspecialidad
    },

    //CONSEGUIR LAS CITAS PENDIENTES
    getCitasPendientes(state){
        return state.citasPendientes
    },

    //CONSEGUIR LAS CITAS ATENDIDAS
    getCitasAtendidas(state){
        return state.citasAtendidas
    },

    //CONSIGUE LOS DATOS DE LOS SINTOMAS DEL PACIENTE DE LA CITA
    getDataSintomasPaciente(state){
        return state.dataSintomasPaciente
    },

    //CONSIGUE LOS DATOS DEL HISTORIAL DEL PACIENTE
    getHistorialPaciente(state){
      return state.historialPaciente
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

    //PONE LOS HORARIOS OCUPADOS DEL DOCTOR
    setHorariosOcupados(state, payload) {
      state.horariosOcupados = payload
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
    },

    //PONE LAS CITAS ATENDIDAS
    setCitasAtendidas(state,payload){
      state.citasAtendidas=payload
    },

    //PONE LOS DATOS DE LOS SINTOMAS DEL PACIENTE DE LA CITA
    setDataSintomasPaciente(state,payload){
        state.dataSintomasPaciente = payload
    },

    //CONSIGUE LOS DATOS DEL HISTORIAL DEL PACIENTE
    setHistorialPaciente(state, payload){
      state.historialPaciente = payload
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

    //CONSULTA PARA LISTAR LOS HORARIOS DEL DOCTOR
    listarHorariosOcupadosDoctor({ commit }, doctor) {
      return axios
         .get(`/doctor/horarios_ocupados/${doctor.id}`)

     .then((res) => {
         console.log(res)
         if(res.data.length!=0){
             commit('setHorariosOcupados',null)
             console.log("si tiene horarios")
             commit('setHorariosOcupados',res.data)
             
         }else{
           commit('setHorariosOcupados',null)
         
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
            .get(`/doctor/cita/listar_pendientes/${doctor.id}`,
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
    },

    //CONSULTA PARA CONSEGUIR LAS CITAS ATENDIDAS POR EL DOCTOR
    listarCitasAtendidas({commit},doctor){
      let url =
      `/doctor/historial/${doctor.id}`;
      return axios
      .get(url, {
        headers: {
          Authorization: `${doctor.token}`,
        },
      })

      .then((res) => {
          console.log(res)
          if(res.data.msg!== "Usted no tiene citas atendidas"){ 
            commit('setCitasAtendidas',res.data)
            return Promise.resolve(true)
          }else{
            commit('setCitasAtendidas',null)
            return Promise.resolve(false)
          }
      })
      .catch((e) => {
          console.log(e)
          return Promise.resolve(false)
      });
    },

    //CONSULTA PARA CONSEGUIR LOS SINTOMAS DEL PACIENTE
    sintomasPaciente({commit},datos){
        return axios 
        .get(`/doctor/cita/detalle/${datos.id_cita}`
            ,{
                headers: {
                  Authorization: `${datos.doctor.token}`,
                },
              })
        .then((res)=>{
            console.log("Sintomas del paciente: ")
            console.log(res.data)
            if(res.data.msg == "No se encontro la cita") 
            commit('setDataSintomasPaciente',null)
            else if(res.data != null)
            commit('setDataSintomasPaciente',res.data)
            else
            commit('setDataSintomasPaciente',null)
            return Promise.resolve(true)
        })
        .catch((e)=>{
            console.log(e)
            return Promise.resolve(false)
        })
    },

    registrarInformeMedico({commit,dispatch},datos){
        let url = `/doctor/cita/registrar_diagnostico/${datos.doctor.id}`;
        return axios
          .post(
            url,
            { ...datos.informe },
            {
              headers: {
                Authorization: `${datos.doctor.token}`,
              },
            }
          )
        .then((res)=>{
            console.log(res)
            if(res.data.msg =="Ya existe un diagnóstico para esta cita"){
              dispatch('mensajeTipoAlert', {mensajeAlerta: res.data.msg,tipoAlerta:'warning'} , { root: true })
              return Promise.resolve(true)
            }else{
              dispatch('mensajeTipoAlert', {mensajeAlerta:"Informe registrado con éxito." ,tipoAlerta:'success'} , { root: true })
              return Promise.resolve(false)
            }

        })
        .catch((e)=>{
            console.log(e)
            dispatch('mensajeTipoAlert', {mensajeAlerta:"Ocurrio un error en el registro",tipoAlerta:'error'} , { root: true })
            return Promise.resolve(false)
        })
    },

    //CONSULTA PARA REGISTRAR LA RECETA MÉDICA EXPEDIDAD EN LA CITA
    registrarRecetaMedica({commit,dispatch},datos){
      let url = `/doctor/receta/crear/${datos.doctor.id}`;
      return axios
      .post(
        url,
        datos.lista,
        {
          headers: {
            'Authorization': `${datos.doctor.token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      )
      .then((res)=>{
        console.log(res)
        if(res.data.msg =="Nueva receta guardada"){
          dispatch('mensajeTipoAlert', {mensajeAlerta: "Receta registrada con éxito",tipoAlerta:'success'} , { root: true })
          return Promise.resolve(true)
        }else{
          dispatch('mensajeTipoAlert', {mensajeAlerta:"Ya existe una receta registrada en esta cita." ,tipoAlerta:'warning'} , { root: true })
          return Promise.resolve(false)
        }
      })
      .catch((e)=>{
        console.log(e)
        dispatch('mensajeTipoAlert', {mensajeAlerta:"Ocurrió un error al guardar la receta médica." ,tipoAlerta:'error'} , { root: true })
        return Promise.resolve(false)
      })
    },

    //CONSULTA PARA ATENDER CITA
    atenderCita({commit},datos){
      let url =
        `/doctor/cita/estado/${datos.doctor.id}`;
       return axios
        .post(url,
          { estado: datos.estado, id_cita : datos.id_cita  },
          {
            headers: {
              Authorization: `${datos.doctor.token}`,
            },
          }
        )

        .then((res) => {
            console.log(res)
            if(res.data.msg == "Estado guardado"){
              return Promise.resolve(true)
            }else{
              return Promise.resolve(true)
            }
        })
        .catch((e) => {
            console.log("ocurrio un error")
            return Promise.resolve(true)
        });
    },

    historialDelPaciente({commit},datos){
      let url =
        `/doctor/cita/ver_historial_de_paciente/${datos.doctor.id}`;
       return axios
        .post(url,
          { id_cita : datos.id_cita  },
          {
            headers: {
              Authorization: `${datos.doctor.token}`,
            },
          }
        )

        .then((res) => {
            console.log(res)
            if(res.msg == "asd"){
              commit('setHistorialPaciente',null)
              return Promise.resolve(false)
            }else{
              commit('setHistorialPaciente',res.data)
              return Promise.resolve(true)
            }

        })
        .catch((e) => {
            console.log("ocurrio un error")
            return Promise.resolve(true)
        });
    }



};

export default {
    state,
    getters,
    mutations,
    actions,
}