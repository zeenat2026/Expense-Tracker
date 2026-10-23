
// import { api } from "./api";
import { api} from './api.js'

export const registerUser = async (userData) => {
    const response = await api.post('/users/register',userData);
    return response.data
}


export const loginUser = async (userData) =>{
    const response = await api.post('/users/login',userData);
        return response.data;
}