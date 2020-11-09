const state = {
    reglas: {
        requerido: (v) => !!v || "Este campo es requerido.",  // CAMPO REQUERIDO
        correo: (v) => /.+@.+\..+/.test(v) || "El correo debe ser válido", //CORREO VÀLIDO
        DNI: (v) => (v && v.length == 8) || 'El DNI debe ser de 8 dígitos.', // DNI VÀLIDO
        edad: (v) => (v && v >= 18  ) || 'Debe ser mayor de edad.', //EDAD VÀLIDA
        minimochar : (v) => (v && v.length >= 8)  || 'Mínimo 8 carácteres.', //MINIMO CARÀCTERES
        pass : (v) => /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(v) || 'Debe contener por lo menos una mayúscula y un número.',  //CONTRASEÑA ESPECIAL
    },
    
};

const getters = {
    //CONSIGUE TODAS LAS REGLAS
    getReglas(state){
        return state.reglas
    },
};

const mutations = {

};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions,
}