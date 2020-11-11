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
            .post("https://sicramv1.herokuapp.com/api/signupuser",{
                
                    emaiL: "d1sd@asd.com",
                    password : "asdfasf",
                    name: "asd",
                    lastname : "asd",
                    dni: 78945612,
                    edad : 39,
                    celular : 987456321,
                    direccion: "asdasfasfaf"
                
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