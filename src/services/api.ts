import axios from "axios";

// Backend URL

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


// Axios Instance

const api = axios.create({

  baseURL: API_URL,

  headers: {

    "Content-Type": "application/json",

  },

});


// Request Interceptor

api.interceptors.request.use(
(config)=>{

    const token = localStorage.getItem("token");

    if(token){

        config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

    },

    (error)=>{

        return Promise.reject(error);

    }

);


// Response Interceptor

api.interceptors.response.use(

(response)=>{
return response;

},


(error)=>{


if(error.response){
    console.error(
        "API Error:",
        error.response.data
    );
}

else{

    console.error(
        "Network Error:",
        error.message

    );

}

return Promise.reject(error);


}


);

export default api;