const state = {
    reglasCampoRequerido: [
        (v) => !!v || "Este campo es requerido.",
    ], // VARIABLE PARA LAS REGLAS DE CAMPO REQUERIDO
    reglasCorreo: [
        (v) => !!v || "El correo es requerido.",
        (v) => /.+@.+\..+/.test(v) || "El correo debe ser válido",
    ], // VARIABLE PARA LAS REGLAS DEL CORREO
    reglasDNI: [
        (v) => !!v || "Este campo es requerido.",
        (v) => (v && v.length == 8) || 'El DNI debe ser de 8 dígitos.',
    ], // VARIABLE PARA LAS REGLAS DE CAMPO REQUERIDO
    reglasEdad: [
        (v) => !!v || "Este campo es requerido.",
        (v) => (v && v >= 18  ) || 'Debe ser mayor de edad.',
    ], // VARIABLE PARA LAS REGLAS DE EDAD
    
};

const getters = {
    //CONSIGUE LAS REGLAS DE CAMPO REQUERIDO
    getReglasCampoRequerido(state){
        return state.reglasCampoRequerido
    },

    //CONSIGUE LAS REGLAS DEL CORREO
    getReglasCorreo(state){
        return state.reglasCorreo
    },

    //CONSIGUE LAS REGLAS DE DNI
    getReglasDNI(state){
        return state.reglasDNI
    },

    //CONSIGUE LAS REGLAS DE EDAD
    getReglasEdad(state){
        return state.reglasEdad
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