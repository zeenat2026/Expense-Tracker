import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import { Box } from "@mui/material"
import Footer from "../components/common/Footer"

const MainLayout = () => {
  return (
    <Box sx={{width:'100%', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <Navbar />
    <Box sx={{flex:1}}>
  <Outlet />
    </Box>
      
      <Footer />
    </Box>
  )
}

export default MainLayout
