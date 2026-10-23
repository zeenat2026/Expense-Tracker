
import { Box, Paper, Snackbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';



const AddExpense = () => {
 
        const [openSnackbar, setOpenSnackbar] = useState(false);
        const [snackbarMsg, setSnackbarMsg] = useState('');

        const navigate = useNavigate();
 
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Add Expense
                </Typography>   

                <Snackbar 
             open={openSnackbar} 
             onClose={() => setOpenSnackbar(false)} 
             autoHideDuration={3000}
             message={snackbarMsg} />

             <ExpenseForm 
             openSnackbar={(condition)=>setOpenSnackbar(condition)}
             snackbarMsg={(msg)=>setSnackbarMsg(msg)}
             onSuccess={() => navigate('/')}  
             onCancel={()=>navigate('/')} />

             
            </Paper>
        </Box>
    );
};

export default AddExpense;