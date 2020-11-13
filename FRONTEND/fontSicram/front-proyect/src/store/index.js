import Vue from 'vue'
import Vuex from 'vuex'
import paciente from './modules/paciente.js'
import reglas from './modules/reglas.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        componenteDoctor: 'InicioDoctor'
    },
    getters: {
        getComponenteDoctor(state) {
            return state.componenteDoctor
        }
    },
    mutations: {
        setComponenteDoctor(state, payload) {
            state.componenteDoctor = payload
        }
    },
    actions: {
        cambiarComponenteDoctor({ commit }, payload) {
            commit('setComponenteDoctor', payload)
        }
    },
    modules: {
        reglas: reglas,
        paciente: paciente,
    }
})