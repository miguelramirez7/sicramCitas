const axios = require('axios');

const state = {
    organizacionPerfil : null, //VARIABLE PARA CONSEGUIR LOS DATOS DE LA ORGANIZACION
    doctoresOrganizacion: null , //VARIABLE PARA CONSEGUIR LA LISTA DE DOCTORES DE LA ORGANIZACION
};

const getters = {
    //CONSIGUE LOS DATOS DEL PERFIL DE LA ORGANIZACION
    getOrganizacionPerfil(state){
        return state.organizacionPerfil 
    },

    //CONSIGUE LOS DOCTORES REGISTRADOS PARA EL DOCTOR
    getDoctoresOrganizacion(state){
        return state.doctoresOrganizacion
    }
};

const mutations = { 
    //PONE LOS DATOS DEL PERFIL DE LA ORGANIZACION
    setOrganizacionPerfil(state,payload){
        state.organizacionPerfil = payload
    },

    //PONE LA LISTA DE LOS DOCTORES DE LA ORGANIZACION
    setDoctoresOrganizacion(state, payload){
        state.doctoresOrganizacion = payload
    }
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

};

export default {
    state,
    getters,
    mutations,
    actions,
}