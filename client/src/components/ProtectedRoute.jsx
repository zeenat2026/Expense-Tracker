
import { Navigate } from 'react-router-dom';
import useAuthStore  from '../store/authStore.js';
import { isTokenValid } from '../utils/tokenUtils.js';

const ProtectedRoute = ({children}) => {
    const token = useAuthStore((state) => state.token)
    const valid = isTokenValid(token);
    
   return valid ?  children: <Navigate to={'/login'} replace />
}

export default ProtectedRoute
