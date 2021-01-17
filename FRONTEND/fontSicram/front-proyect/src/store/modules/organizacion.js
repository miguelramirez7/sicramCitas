const axios = require('axios')
//axios.defaults.baseURL = 'https://sicramtest.herokuapp.com/api';

const state = {
    
};

const getters = {
    
};

const mutations = {

};

const actions = {
    //CONSULTA PARA CREAR UNA ORGANIZACION 
    registrarOrganizacion({commit,dispatch},datos){
        return axios
            .post("/signuporganizacion",{...datos})
            .then((res)=>{
                console.log(res.data.msg)
                if(res.data.msg == "Exito nuevo organizacion creado."){
                    dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'success'} , { root: true })
                    return Promise.resolve(true)
                }else{
                    dispatch('mensajeTipoAlert', {mensajeAlerta:res.data.msg ,tipoAlerta:'warning'} , { root: true })
                    return Promise.resolve(false)
                }
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