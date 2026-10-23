import { useState, useEffect, memo, useMemo } from 'react';
import {  Typography, Alert, Chip, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import { Box, Grid, Card, CardContent, CardActions } from '@mui/material';
import { deleteExpense, getExpenses } from '../service/expenseService';
import Loader from './Loader';
import ExpenseForm from './ExpenseForm.jsx';
import ExpenseChart from './ExpenseChart.jsx';
import ExpenseFilters from './ExpenseFilters.jsx';
import ExpenseSummary from './ExpenseSummary.jsx';


const ExpenseList = () => {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);


  useEffect(() => {

    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        setErr(error.response?.data?.message || 'Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  if (loading) return <Loader />;
  if (err) return <Alert severity="error" sx={{ mt: 4 }}>{err}</Alert>;
  if (expenses.length === 0) return <Typography sx={{ mt: 4, textAlign: 'center' }}>No expenses yet.</Typography>;
  return (
    <ExpenseCard expenses={expenses} setExpenses={setExpenses} />
  )
};

const ExpenseCard = ({ expenses, setExpenses }) => {

  const [editExpense, setEditExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExpense, setFilterExpense] = useState({
    type: '',
    category: '',
    month: new Date().getMonth() + 1
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const categoryData = useMemo(() => {
    return Object.entries(expenses.reduce((acc, curr) => {
      acc.hasOwnProperty(curr.category)
        ? (acc[curr.category] += Number(curr.amount))
        : (acc[curr.category] = Number(curr.amount));
      return acc;
    }, {}));
  }, [expenses]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFilterExpense((prev) => ({ ...prev, [name]: value }));
  }

  const filteredExpense = expenses.filter((expense) => {
    const titleMatch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = filterExpense.type === '' || expense.type === filterExpense.type;
    const categoryMatch = filterExpense.category === '' || expense.category === filterExpense.category;
    const monthMatch = filterExpense.month === '' || new Date(expense.date).getMonth() + 1 === filterExpense.month;
    return titleMatch && typeMatch && categoryMatch && monthMatch;
  }
  )



  const handleDeleteExpense = async (id) => {
    try {
      const data = await deleteExpense(id);
      setExpenses((preV) => preV.filter((exp) => exp._id !== id));
      setExpenseToDelete(null);
      setSnackbarOpen(true);
      setSnackbarMessage(data.message)

    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarMessage(error.response?.data?.message)
    }

  }





  return (
    <Box sx={{  mt: 9 }}>
      {/* Expense Summary */}

      <ExpenseSummary expenses={expenses} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />

      {/* Expense Chart */}
      <ExpenseChart categoryData={categoryData} />
     
      <ExpenseFilters
        filterExpense={filterExpense}
        handleOnChange={handleOnChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} />


      {filteredExpense.length === 0 ? (
        <Typography sx={{ mt: 4, textAlign: 'center', color: 'red' }}>No Matching Expense Found</Typography>
      ) :

        (<Grid container spacing={2} sx={{ mt: 2 }}>

          {filteredExpense.map((exp) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={exp._id} >
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{exp.title}</Typography>
                    <Chip
                      label={exp.type}
                      color={exp.type === 'income' ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    {exp.type === 'income' ? '+' : '-'}Rs {exp.amount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {exp.category}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(exp.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => setEditExpense(exp)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => setExpenseToDelete(exp)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>)
      }

      {expenseToDelete && (
        <Dialog open onClose={() => setExpenseToDelete} fullWidth maxWidth='xs'>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this expense?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setExpenseToDelete(null)}>Cancel</Button>
            <Button onClick={() => handleDeleteExpense(expenseToDelete._id)} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}



      {editExpense && (
        <Dialog open onClose={() => setEditExpense(false)} fullWidth maxWidth='xs'>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogContent>
            <Box>
              <ExpenseForm
                previousExpenses={editExpense}
                onCancel={() => setEditExpense(null)}
                onSuccess={(updated) => {
                  setExpenses((prev) => prev.map((exp) => (exp._id === updated._id ? updated : exp)));
                  setEditExpense(null);
                  setSnackbarOpen(true);
                  setSnackbarMessage('Expense updated successfully');
                }

                }
               openSnackbar={(condition)=>setSnackbarOpen(condition)}
               snackbarMsg={(msg)=>setSnackbarMessage(msg)}
              />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
export default memo(ExpenseList);