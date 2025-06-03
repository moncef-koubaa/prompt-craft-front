import axios from "axios";
import router from "@/router/index.js";

const baseAxios = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 100000,
});

baseAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response){
            if (error.response.status && error.response.status === 401) {
                if(localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                }
                router.push('/auth/signin');
            }
        }

        return Promise.reject(error);
    }
);
export default baseAxios;