const axios = require('axios');
axios.defaults.baseURL = 'https://sicramtest.herokuapp.com/api';
const state = {
    organizacionPerfil : null, //VARIABLE PARA CONSEGUIR LOS DATOS DE LA ORGANIZACION
    doctoresOrganizacion: null , //VARIABLE PARA CONSEGUIR LA LISTA DE DOCTORES DE LA ORGANIZACION
    estadisctica1: null, //DOCTORES POR ESPECIALIDAD 
    estadistica2 : null, //ATENDIDOS POR DOCTORES
    estadistica3 : null, //CITAS ATENDIDAS POR DOCTOR
    estadistica4 : null, //ATENDIDOS POR ESPECIALIDAD
};

const getters = {
    //CONSIGUE LOS DATOS DEL PERFIL DE LA ORGANIZACION
    getOrganizacionPerfil(state){
        return state.organizacionPerfil 
    },

    //CONSIGUE LOS DOCTORES REGISTRADOS PARA EL DOCTOR
    getDoctoresOrganizacion(state){
        return state.doctoresOrganizacion
    },

    //CONSIGUE LA ESTADÍSTICA 1
    getEstadistica1(state){
        return state.estadisctica1
    },

    //CONSIGUE LA ESTADÍSTICA 2
    getEstadistica2(state){
        return state.estadistica2
    },

    //CONSIGUE LA ESTADÍSTICA 3
    getEstadistica3(state){
        return state.estadistica3

    },
    //CONSIGUE LA ESTADÍSTICA 4
    getEstadistica4(state){
        return state.estadistica4
    },
};

const mutations = { 
    //PONE LOS DATOS DEL PERFIL DE LA ORGANIZACION
    setOrganizacionPerfil(state,payload){
        state.organizacionPerfil = payload
    },

    //PONE LA LISTA DE LOS DOCTORES DE LA ORGANIZACION
    setDoctoresOrganizacion(state, payload){
        state.doctoresOrganizacion = payload
    },

    //CONSIGUE LA ESTADÍSTICA 1
    setEstadistica1(state,payload){
        state.estadisctica1 = payload 
    },

    //CONSIGUE LA ESTADÍSTICA 2
    setEstadistica2(state,payload){
        state.estadistica2 = payload
    },
    
    //CONSIGUE LA ESTADÍSTICA 3
    setEstadistica3(state,payload){
        state.estadistica3 = payload
    },

    //CONSIGUE LA ESTADÍSTICA 4
    setEstadistica4(state,payload){
        state.estadistica4 = payload
    },
};

const actions = {
    //CONSULTA PARA CREAR UNA ORGANIZACION 
    registrarOrganizacion({commit,dispatch},datos){
        return axios
            .post("/signuporganizacion",{...datos})
            .then((res)=>{
                console.log(res.data.msg)
                if(res.data.msg == "Exito nuevo organizacion creado."){
                    dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'success'} , { root: true })
                    return Promise.resolve(true)
                }else{
                    dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'warning'} , { root: true })
                    return Promise.resolve(false)
                }
            })
            .catch((e)=>{
                console.log(e)
                dispatch('mensajeTipoAlert', {mensajeAlerta:"Este correo está en uso." ,tipoAlerta:'error'} , { root: true })
                return Promise.resolve(false)
            })
    },

    //CONSULTA PARA CONSEGUIR EL PERFIL DE LA ORGANIZACIÓN
    perfilOrganizacion({ commit, dispatch }, organizacion) {

        let url = `/organizacion/perfil/${organizacion.id}`;
        axios
            .get(url, {
                headers: {
                    Authorization: `${organizacion.token}`,
                },
            })
            .then((res) => {
                console.log("DATOS ORGA: ", res.data)
                commit('setOrganizacionPerfil', res.data)
                //dispatch('leerUsuario', null, { root: true });
            })
            .catch((e) => {
                console.log(e)
            });
    },

    //CONSULTA PARA ACTUALIZAR EL PERFIL DE LA ORGANIZACIÓN
    actualizarOrganizacion({ commit, dispatch }, datos) {
        let url = `/organizacion/perfil/update/${datos.organizacion.id}`;
        return axios
          .post(
            url,
            { ...datos.newDatos },
            {
              headers: {
                Authorization: `${datos.organizacion.token}`,
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

     //CONSULTA PARA AGREGAR DOCTOR A LA ORGANIZACION
     registrarDoctorOrga({ commit, dispatch }, datos) {

        let url = `/organizacion/doctor/registrar/${datos.organizacion.id}`;
        return axios
            .post(
                url, {...datos.newDoctor }, {
                    headers: {
                        Authorization: `${datos.organizacion.token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res)
                if (res.data.msg === "Bienvenido Doctor, es un nuevo usario.") {
                    dispatch('mensajeTipoAlert', { mensajeAlerta: "Doctor creado con éxito.", tipoAlerta: 'success' }, { root: true })
                    return Promise.resolve(true)
                } else {
                    dispatch('mensajeTipoAlert', { mensajeAlerta: "El nombre del doctor y el cmp no coinciden", tipoAlerta: 'warning' }, { root: true })
                    return Promise.resolve(false)
                }

            })
            .catch((e) => {
                dispatch('mensajeTipoAlert', { mensajeAlerta: e, tipoAlerta: 'error' }, { root: true })
                return Promise.resolve(false)
            })
    },

    //CONSULTA PARA LISTAR LOD DOCTORES DE LA ORGANIZACIÓN
    listarDoctorOrga({ commit }, organizacion) {
        return axios
           .get(`/organizacion/doctor/obtener/${organizacion.id}`,
           {
            headers: {
                Authorization: `${organizacion.token}`,
            },
            })

       .then((res) => {
           console.log(res)
           if(res.data.length!=0){
               commit('setDoctoresOrganizacion',null)
               console.log("si tiene horarios")
               commit('setDoctoresOrganizacion',res.data)
               return Promise.resolve(true)
           }else{
             commit('setDoctoresOrganizacion',null)
             return Promise.resolve(false)
           }
           
           
       })
       .catch((e) => {
           console.log(e)
           return Promise.resolve(false)
       });
   },

    //CONSULTA PARA ELIMINAR UN DOCTOR DE LA ORGANIZACION
    eliminarDoctor({commit,dispatch},datos){
    let url = `/organizacion/doctor/eliminar/${datos.organizacion.id}`;
    return axios
      .post(
        url,
        { id_doctor: datos.id_doctor },
        {
          headers: {
            Authorization: `${datos.organizacion.token}`,
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

    //REPORTE DE DOCTORES POR ESPECIALIDAD
    reporteDoctoresEspecialidad({commit}){
        return axios
           .get("/doctor/estadisticas/especialidad")
            .then((res) => {
                console.log(res)
                commit('setEstadistica1',res.data.reporte)
                return Promise.resolve(true)
            })
            .catch((e) => {
                console.log(e)
                return Promise.resolve(false)
            });
    },

    //REPORTE DE PACIENTE ATENDIDOS POR DOCTORES
    reportePacienteAtendidoDoc({commit}){
        return axios
           .get(`/doctor/estadisticas/pacientes/atendidos`)
            .then((res) => {
                console.log(res)
                commit('setEstadistica2',res.data.data)
                return Promise.resolve(true)
            })
            .catch((e) => {
                console.log(e)
                return Promise.resolve(false)
            });
    },

    //REPORTE CITAS ATENDIDAS POR DOCTORES
    reporteCitaAtendidaDoc({commit}){
        return axios
           .get(`/doctor/estadisticas/citas/atendidas`)
            .then((res) => {
                console.log(res)
                commit('setEstadistica3',res.data.data)
                return Promise.resolve(true)
            })
            .catch((e) => {
                console.log(e)
                return Promise.resolve(false)
            });
    },

    //REPORTE ATENDIDOS POR ESPECIALIDAD
    reporteAtendidosEspecialidad({commit}){
        return axios
           .get(`/doctor/estadisticas/pacientes/atendidos/especialidad`)
            .then((res) => {
                console.log(res)
                commit('setEstadistica4',res.data.data)
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