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
        },
        //IMPIME LA RECETA MEDICA
    imprimirDom(dato){
        const prtHtml = document.getElementById('inprime').innerHTML;
  
        // Get all stylesheets HTML
        let stylesHtml = "";
        for (const node of [
          ...document.querySelectorAll('link[rel="stylesheet"], style'),
        ]) {
          stylesHtml += node.outerHTML;
        }
  
        // Open the print window
        const WinPrint = window.open(
          "",
          "",
          "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
        );
  
        WinPrint.document.write(`<!DOCTYPE html>
        <html>
          <head>
            ${stylesHtml}
          </head>
          <body>
            ${prtHtml}
          </body>
        </html>`);
  
        setTimeout(() => {
          WinPrint.document.close();
          WinPrint.focus();
          WinPrint.print();
          WinPrint.close();
        }, 1000);
      },
    },
    modules: {
        reglas : reglas,
        paciente: paciente,
        doctor: doctor,
        organizacion: organizacion,
        login: login
      }
})
