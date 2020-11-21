const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:3000/api';

const state = {
    doctorPerfil: null // VARIABLE PARA LOS DATOS DEL DOCTOR
};

const getters = {
    getDoctorPerfil(state) {
        return state.doctorPerfil
    }
};

const mutations = {
    setDoctorPerfil(state, payload) {
        state.doctorPerfil = payload
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
                dispatch('leerUsuario', null, { root: true });
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
                url, {...datos.newDatos }, {
                    headers: {
                        Authorization: `${datos.doctor.token}`,
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

    //CONSULTA PARA AGREGAR HORARIO AL DOCTOR
    registrarHorarioDoctor({ commit }, datos) {

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
                return Promise.resolve(false)
            })
            .catch((e) => {
                return Promise.resolve(false)
            })
    },

    //CONSULTA PARA LISTAR LOS HORARIOS DEL DOCTOR
    listarHorariosDoctor({ commit }, doctor) {
        axios
            .get(`/doctor/horarios/${doctor.id}`)

        .then((res) => {
                console.log(res)
                if (res.data.length != 0) {


                } else {

                }
            })
            .catch((e) => {
                console.log(e)
            });
    },

    //MODIFICAR EL HORARIO DE DOCTOR
    modificarHorario({ commit }, datos) {
        let url = `/doctor/horario/modificar/${datos.doctor.id}`;
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

                return Promise.resolve(true)

            })
            .catch((e) => {
                console.log(e)
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