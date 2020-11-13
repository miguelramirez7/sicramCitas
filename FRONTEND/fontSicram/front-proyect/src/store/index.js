import Vue from 'vue'
import Vuex from 'vuex'
import paciente from './modules/paciente.js'
import reglas from './modules/reglas.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        componenteDoctor: 'InicioDoctor',
        componentePaciente: 'InicioPaciente',
        componenteOrganizacion: 'InicioOrganizacion'
    },
    getters: {
        getComponenteDoctor(state) {
            return state.componenteDoctor
        },
        getComponentePaciente(state) {
            return state.componentePaciente
        },
        getComponenteOrganizacion(state) {
            return state.componenteOrganizacion
        }
    },
    mutations: {
        setComponenteDoctor(state, payload) {
            state.componenteDoctor = payload
        },
        setComponentePaciente(state, payload) {
            state.componentePaciente = payload
        },
        setComponenteOrganizacion(state, payload) {
            state.componenteOrganizacion = payload
        }
    },
    actions: {
        cambiarComponenteDoctor({ commit }, payload) {
            commit('setComponenteDoctor', payload)
        },
        cambiarComponentePaciente({ commit }, payload) {
            commit('setComponentePaciente', payload)
        },
        cambiarComponenteOrganizacion({ commit }, payload) {
            commit('setComponenteOrganizacion', payload)
        }
    },
    modules: {
        reglas: reglas,
        paciente: paciente,
    }
})