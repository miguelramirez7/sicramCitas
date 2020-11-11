const axios = require('axios');
const state = {
    
};

const getters = {
    
};

const mutations = {

};

const actions = {
    registrarPaciente({commit},datos){
        let url = `http://localhost:3000/api/signupuser`;
        return axios
            .post(url,datos)
            .then((res)=>{
                console.log(res)
            })
            .catch((e)=>{
                console.log(e)
            })
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}