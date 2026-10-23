import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import './App.css';
import {  Routes,Route } from 'react-router-dom'
import  Dashboard from './pages/Dashboard.jsx'
import { getTheme } from './customeTheme/theme.js';
import MainLayout from './layout/MainLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AddExpense from './pages/AddExpense.jsx';
import { useThemeStore } from './store/themeStore.js';
import { useMemo } from 'react';


const App = () => {
  const mode = useThemeStore((state) => state.mode);
    const PrefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  const actualMode = useMemo(() => {
    if (mode === 'system') {
      return PrefersDark ? 'dark' : 'light';
    };
    return mode
  }, [mode, PrefersDark]);
  const myTheme = useMemo(() => getTheme(actualMode), [actualMode]);
  return (
    
    <>
  
    <ThemeProvider theme={myTheme}>
        <CssBaseline />
   <Routes>
  <Route path="/" element={<MainLayout />}>
    <Route index element={
      <ProtectedRoute><Dashboard /></ProtectedRoute>
    } />
    <Route path="add-expense" element={
      <ProtectedRoute><AddExpense /></ProtectedRoute>                           
    } />
  </Route>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>
</ThemeProvider>
    </>
  )
}

export default App
