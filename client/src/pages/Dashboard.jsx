// Dashboard.jsx
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpenseList from '../components/ExpenseList';


const Dashboard = () => {

  return (
    <Box sx={{ p: 3 , zIndex:10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography sx={{color:'primary.main'}} variant="h4" component="h1">My Expenses</Typography>
        <Fab
          sx={{position:'fixed' , bottom:16 , right:16}}
         component={Link} to="/add-expense" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
      <ExpenseList />
    </Box>
  );
};

export default Dashboard;