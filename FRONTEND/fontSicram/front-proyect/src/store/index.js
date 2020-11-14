import Vue from 'vue'
import Vuex from 'vuex'
import paciente from './modules/paciente.js'
import doctor from './modules/doctor.js'
import organizacion from './modules/organizacion.js'
import login from './modules/login.js'
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
    doctor: doctor,
    organizacion: organizacion,
    login: login
  }
})
