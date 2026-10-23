import {create} from 'zustand';
import {persist} from 'zustand/middleware';


const useAuthStore = create(persist(
    (set)=>(
    {
    user:null,
    token:null,
    isAuthenticated: false,

    setCredentials: ({userData,token})=>set({
        user:userData,
        token:token,
        isAuthenticated: true
    }),
    
    logout:()=>set({
        user:null,
        token:null,
        isAuthenticated: false
    })

}
)
,{name:'auth-storage'}
));

export default useAuthStore;

