const state = {
    reglas: {
        requerido: (v) => !!v || "Este campo es requerido.",  // CAMPO REQUERIDO
        correo: (v) => /.+@.+\..+/.test(v) || "El correo debe ser válido", //CORREO VÀLIDO
        DNI: (v) => (v && v.length == 8) || 'El DNI debe ser de 8 dígitos.', // DNI VÀLIDO
        edad: (v) => (v && v >= 18  ) || 'Debe ser mayor de edad.', //EDAD VÀLIDA
        minimochar : (v) => (v && v.length >= 8)  || 'Mínimo 8 carácteres.', //MINIMO CARÀCTERES
        pass : (v) => /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(v) || 'Debe contener por lo menos una mayúscula, una minúscula y un número.',  //CONTRASEÑA ESPECIAL
        numCelular: (v) => (v && v.length == 9) || 'Debe ser un número válido.', // DNI VÀLIDO
        celular: (v) => /9+(?=.*\d)/.test(v) || 'Debe ser un número válido.',  //CONTRASEÑA ESPECIAL
    },

    alerta: {
        mensajeAlerta: null, //MENSAJE QUE CONTIENE LA ALERTA
        tipoAlerta: null, //EL TIPO DE ALERTA
    },

    _idCita : null, // ID DE LA CITA 
    
};

const getters = {
    //CONSIGUE TODAS LAS REGLAS
    getReglas(state){
        return state.reglas
    },
    //CONSIGUE EL MENSAJE DE LA ALERTA
    getAlert(state){
        return state.alerta
    },

    //CONSIGUE EL IDE DE LA CITA
    get_idCita(state){
        return state._idCita
    }

};

const mutations = {
    //PONE EL MENSAJE Y EL TIPO DE ALERTA
    setAlerta(state,payload){
        state.alerta = payload
    },
    //PONE EL VALOR DE LA ID DE LA CITA
    set_idCita(state,payload){
        state._idCita = payload
    }
};

const actions = {
    //LLAMA AL SETTER DE LA ALERTA
    mensajeTipoAlert({commit},alerta){
        commit('setAlerta',alerta)
    },

    //GUARDA LA ID DE LA CITA EN LOCAL STORAGE
    save_idCita({commit},id){
        localStorage.setItem('_idCita',id)
    },

    //LEE EL VALOR DE LA ID DE LA CITA EN EL LOCAL STORAGE
    read_idCita({commit}){
        const cita = localStorage.getItem('_idCita')
        commit('set_idCita',cita)
    },

    //PARA BORRAR EL ID DE LA CITA DEL LOCAL STORAGE
    unsave_idCita({commit}){
        localStorage.removeItem('_idCita')
        commit('set_idCita',null)
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}