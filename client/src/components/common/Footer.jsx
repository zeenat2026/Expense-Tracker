import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
  <Box sx={{textAlign:'center',padding:2}}>
   <Typography variant='body1'>   Copyright &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</Typography>
  </Box>
  )
}

export default Footer
