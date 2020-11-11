const axios = require('axios');
const state = {
    
};

const getters = {
    
};

const mutations = {

};

const actions = {
    registrarPaciente({commit},datos){
        axios
            .post("https://sicramv1.herokuapp.com/api/signupuser",{...datos},
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
            )
            .then((res)=>{
                console.log(res.data.msg)
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