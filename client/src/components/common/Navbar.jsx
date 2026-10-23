import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessSharpIcon from '@mui/icons-material/SettingsBrightnessSharp';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {NavLink, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import useAuthStore from '../../store/authStore';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Container } from '@mui/material';
import { useThemeStore } from '../../store/themeStore';

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useAuthStore(state=>state.user)
  const logoutFn = useAuthStore(state=>state.logout)
  const navigate = useNavigate();
  
const handleUserOpenMeneu = (e) =>{
  setAnchorElUser(e.currentTarget)
}
const handleCloseUserMenu = () => {
  setAnchorElUser(null);
}
function handleLogout() {
  logoutFn();
  console.log('logout fnc not calling...');
  
  handleCloseUserMenu()
  navigate('/login')
}
  useEffect(()=>{
  
  },[user])
  
  return (
         <AppBar position='sticky'  sx={{zIndex:20, bgcolor:'navbar.main',width:'100%'}} >
       <Container maxWidth='xl'>
         <Toolbar>
        
          <Button color='inhrit'  component={NavLink} to={'/'} >
            Expense Tracker 
          </Button>
          <Box sx={{flexGrow:1}} />

      <Box sx={{display:'flex',gap:2}}>
            { user ? <>
         <Tooltip title='open setting'>
     <IconButton sx={{p:0}}
       onClick={handleUserOpenMeneu}
     >
      <Avatar alt={user.name} sx={{color:'blue',bgcolor:'white'}}>{user.name.charAt(0).toUpperCase()}</Avatar>
     </IconButton>
         </Tooltip>
         <Menu sx={{mt:'45px'}}
         id='menu-appbar'
         anchorEl={anchorElUser}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={Boolean(anchorElUser)}
         onClose={handleCloseUserMenu}
         >
       <MenuItem onClick={handleCloseUserMenu}>
         <Typography sx={{ textAlign: 'center' }}>{user.name}</Typography>
        </MenuItem>
        <MenuItem  onClick={handleLogout}>
          <Typography  sx={{ textAlign: 'center' }}>Logout</Typography>
        </MenuItem>
         </Menu>
         </> :<Button component={NavLink} to='/login' color="inherit">Login</Button>}
        
          <SwitchMode />
      </Box>
        </Toolbar>
       </Container>
      </AppBar>
  );
}

const SwitchMode = ()=>{
const mode = useThemeStore((state)=>state.mode)
const setMode = useThemeStore((state)=>state.setMode)


  return(

    <IconButton sx={{color:'white'}} onClick={()=>{
 if (mode === 'light') {
    setMode('dark')
  }else if (mode === 'dark') {
    setMode('system')
  }else if (mode === 'system') {
    setMode('light')
  }
    }} >
     {mode === 'light' ?
<LightModeIcon />

  : mode === 'dark' ?

    <DarkModeOutlinedIcon />
  :
  
    <SettingsBrightnessSharpIcon />
    }
    </IconButton>
    
 
    
  )
  
}


