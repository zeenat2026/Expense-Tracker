import { useState } from 'react';
import { Box,  TextField, Button, MenuItem, Alert } from '@mui/material';
import { addExpense, updateExpense } from '../service/expenseService';

const categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Salary', 'Other'];
const today=()=> new Date().toISOString().split('T')[0];
const ExpenseForm = ({  previousExpenses, onCancel,onSuccess, openSnackbar,snackbarMsg}) => {
       const [formData, setFormData] = useState({
        title: previousExpenses?.title ||'',
        amount:previousExpenses?.amount ||'',
        type: previousExpenses?.type ||'expense',
        category: previousExpenses?.category ||'',
        date: previousExpenses?.date ? new Date().toISOString().split('T')[0] :today()
    });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

const isEdit = Boolean(previousExpenses);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
    
 const data  = isEdit ?
  await updateExpense( previousExpenses._id,formData)
   : 
   await addExpense(formData);
       onSuccess(data);
    

       
        } catch (error) {
            setErr(error.response?.data?.message || 'Failed to add expense');
            openSnackbar(true);
            snackbarMsg(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

  return (
   <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        error={formData.amount < 0}
                        helperText={formData.amount < 0 && 'Amount cannot be negative'}
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        select
                        label="Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        fullWidth
                    >
                        <MenuItem value="expense">Expense</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                    </TextField>
                    <TextField
                        select
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        fullWidth
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        fullWidth
                        slotProps={{
                            inputLabel:{ shrink: true }
                        }}
                    />

                    {err && <Alert severity="error">{err}</Alert>}

                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Expense'}
        </Button>
      </Box>
                </Box>
  )
}

export default ExpenseForm
