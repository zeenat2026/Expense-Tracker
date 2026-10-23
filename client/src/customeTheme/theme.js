import { createTheme } from "@mui/material";

export const getTheme= (mode)=> createTheme({
 palette: {
  mode: mode,
  
   primary: {
    main: mode === 'dark' ? '#90caf9' : '#1976d2',
  },
  navbar:{
    main: mode === 'dark' ? '#1e293b' : '#1976d2',
  },
  background:{
    default: mode === 'dark' ? '#1e293b' : '#e8e8e8',
    paper:mode === 'dark'? '#1e1e1e' :'#e8e8e8'
  }
}
})