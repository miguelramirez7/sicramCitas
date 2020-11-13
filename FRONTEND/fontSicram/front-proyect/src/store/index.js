import Vue from 'vue'
import Vuex from 'vuex'
import paciente from './modules/paciente.js'
import reglas from './modules/reglas.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        componenteDoctor: 'InicioDoctor',
        componentePaciente: 'InicioPaciente'
    },
    getters: {
        getComponenteDoctor(state) {
            return state.componenteDoctor
        },
        getComponentePaciente(state) {
            return state.componentePaciente
        }
    },
    mutations: {
        setComponenteDoctor(state, payload) {
            state.componenteDoctor = payload
        },
        setComponentePaciente(state, payload) {
            state.componentePaciente = payload
        }
    },
    actions: {
        cambiarComponenteDoctor({ commit }, payload) {
            commit('setComponenteDoctor', payload)
        },
        cambiarComponentePaciente({ commit }, payload) {
            commit('setComponentePaciente', payload)
        }
    },
    modules: {
        reglas: reglas,
        paciente: paciente,
    }
})