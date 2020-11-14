const axios = require('axios');

const state = {
    
};

const getters = {
    
};

const mutations = {

};
 
const actions = {
    registrarPaciente({commit,dispatch},datos){
        return axios
            .post("http://localhost:3000/api/signupuser",{...datos})
            .then((res)=>{
                console.log(res.data.msg)
                if(res.data.msg == "Usuario registrado"){
                    dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'success'} , { root: true })
                }else{
                    dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'warning'} , { root: true })
                }
                
                return Promise.resolve(true)
            })
            .catch((e)=>{
                console.log(e)
                dispatch('mensajeTipoAlert', {mensajeAlerta:"Este correo está en uso." ,tipoAlerta:'error'} , { root: true })
                return Promise.resolve(false)
            })
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}