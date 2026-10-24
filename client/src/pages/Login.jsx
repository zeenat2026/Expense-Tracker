import  { useState,useEffect } from 'react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { loginUser } from '../service/authService';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAuthStore from '../store/authStore';


const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [error,setError] = useState(null);
    const [loading,setLoading]=useState(false);
   const setCredentials = useAuthStore((state) => state.setCredentials);
const navigate = useNavigate();
  
     function handleChange(e) {
   const {name,value} = e.target;
   setFormData((preV)=>{
            return {
                ...preV,
                [name]: value
            }
        })
        
    }
    const handleLogin=async (e)=>{
        e.preventDefault();
        const normalizedEmail = formData.email.trim().toLowerCase();
        try {
            setLoading(true);
  const data=  await loginUser({...formData,email:normalizedEmail});
 
      setCredentials({
      token:data.token,
      userData:{name:data.name,email:data.email}
     })
     

            navigate('/')
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
             setFormData((prev) => ({ ...prev, password: '' }));
        }
        finally {
            setLoading(false);
        }

    
    }

    useEffect(()=>{
      if(!error) return
    const timeoutId=setTimeout(() => {
      setError(null)
    }, 6000);
    
    return ()=>clearTimeout(timeoutId)
    },[error]);

  return (
   <LoginForm err={error} loading={loading} 
   loginFnc={handleLogin}
    formState={formData} handleChange={handleChange}/>
  )
}

const LoginForm = ({err,loading,loginFnc,formState,handleChange}) => {
  const [showPassword, setShowPassword] = useState(false);
  return(
    <Box sx={{display:'flex',justifyContent:'center',mt:8}}>
     <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
      <Box sx={{display:'flex',flexDirection:"column"}}>
    <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component={'h1'} variant='h5'>
            Login
          </Typography>
           <Box component="form"  onSubmit={loginFnc}  sx={{ mt: 3, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete='email'
              label="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete='current-password'
              helperText="Password must be at least 8 characters"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formState.password}
              onChange={handleChange}
              slotProps = {{
              input: {
                endAdornment : (
                 <InputAdornment position="end">
        <IconButton sx={{color:'primary.main'}} onClick={() => setShowPassword((prev) => !prev)} edge="end">
          {showPassword ?  <Visibility />: <VisibilityOff />  }
        </IconButton>
      </InputAdornment>
              )
              }
              }}
            />

            {err && <Alert severity="error" sx={{ mt: 2 }}>{err}</Alert>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Typography variant="body2" align="center">
              Don't have an account?{' '}
              <NavLink to="/register" style={{ color: 'inherit' }}>
                Create new account
              </NavLink>
            </Typography>
          </Box>
      </Box>
     </Paper>
    </Box>
  )
}

export default Login
