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
    }
    
};

const getters = {
    //CONSIGUE TODAS LAS REGLAS
    getReglas(state){
        return state.reglas
    },
    //CONSIGUE EL MENSAJE DE LA ALERTA
    getAlert(state){
        return state.alerta
    }

};

const mutations = {
    //PONE EL MENSAJE Y EL TIPO DE ALERTA
    setAlerta(state,payload){
        state.alerta = payload
    }
};

const actions = {
    //LLAMA AL SETTER DE LA ALERTA
    mensajeTipoAlert({commit},alerta){
        commit('setAlerta',alerta)
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}