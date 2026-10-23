import { Alert, Avatar, Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../service/authService";
import useAuthStore from "../store/authStore";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect } from "react";

 const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;


 function validation(inputValue) {
  let error={}
 
  if (inputValue.name.trim() === '') {
    error.name = 'Name is required';
  }
  if (inputValue.email === '') {
    error.email = 'Email is required';
  } else if (!emailRegex.test(inputValue.email)) {
    error.email = 'Please enter a valid email';
  }
  if (inputValue.password.length < 8) {
    error.password = 'Password must be at least 8 characters';
  }
 
  return error;
    
  }
  
 

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });    
  };

  async function handleSignUp(e) {
    e.preventDefault();
      const normalizedEmail = formData.email.trim().toLowerCase();
      const normalizedName = formData.name.trim();
    setErr(null);
    const validateErrors = validation({...formData,email:normalizedEmail});
    if (Object.keys(validateErrors).length > 0) {
      setErr(Object.values(validateErrors)[0]);
      return;
    }
     
    try {

      setLoading(true);
      const data = await registerUser({...formData,name:normalizedName,email:normalizedEmail});
      setCredentials({
        token: data.token,
        userData: { name: data.name, email: data.email }
      });
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <RegisterForm
      err={err}
      loading={loading}
      signUpFnc={handleSignUp}
      formState={formData}
      handleChange={handleOnChange}
    />
  );
};

useEffect(()=>{
const timeoutId=setTimeout(() => {
  setErr(null)
}, 6000);

return ()=>clearTimeout(timeoutId)
},[err])
const RegisterForm = ({ err, loading, signUpFnc, formState, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Paper elevation={3} sx={{ width: '100%', p: 4, maxWidth: '400px' }}>
        <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component={'h1'} variant="h6">
          Sign Up
        </Typography>
        <Box
          noValidate
          onSubmit={signUpFnc}
          component={'form'}
          sx={{ width: '100%', mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <TextField
            label="Name"
            margin="normal"
            name="name"
            autoComplete="name"
            value={formState.name}
            onChange={handleChange}
            required
            fullWidth
            type="text"
          />

          <TextField
            label="Email"
            name="email"
            value={formState.email}
            margin="normal"
            required
            autoComplete="email"
            fullWidth
            onChange={handleChange}
            type="email"
          />

          <TextField
            label="Password"
            name="password"
            value={formState.password}
            margin="normal"
            required
            fullWidth
            helperText="Password must be at least 8 characters"
            autoComplete="new-password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton sx={{ color: 'primary.main' }} onClick={() => setShowPassword((preV) => !preV)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />

          {err && <Alert severity="error" sx={{ mt: 2 }}>{err}</Alert>}

          <Button type="submit" variant="contained" disabled={loading} sx={{ width: '100%', mt: 2 }}>
            {loading ? 'Creating acount' : 'Sign Up'}
          </Button>

          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'inherit' }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;