import Vue from 'vue'
import Vuex from 'vuex'
import paciente from './modules/paciente.js'
import reglas from './modules/reglas.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    reglas : reglas,
    paciente: paciente,
  }
})
