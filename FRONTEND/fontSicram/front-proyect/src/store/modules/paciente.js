const axios = require('axios');
const qs = require('qs')
/*const axiosInstance = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Content-Length': data.length
    }
  });*/

const state = {
    
};

const getters = {
    
};

const mutations = {

};
 
const actions = {
    registrarPaciente({commit},datos){
        axios
            .post("https://sicramv1.herokuapp.com/api/signupuser",qs.stringify(datos),
            {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                }
              }
            )
            .then((res)=>{
                console.log(datos)
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