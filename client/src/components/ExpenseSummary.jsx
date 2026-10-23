import  { memo } from 'react'
import { Paper,Stack , Typography } from '@mui/material';
const ExpenseSummary = ({expenses}) => {
    
  const totalExpense = expenses.filter((exp) => exp.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalIncome = expenses.filter((exp) => exp.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const netBalance = totalIncome - totalExpense;
  console.log(totalExpense , totalIncome);
  
  return (
    <Paper elevation={3} sx={{  p: 4 }}>
        <Stack   direction={{xs:'column',sm:'row'}} spacing={{xs:1,sm:4}}>
          <Typography component={'h1'} variant='h6' sx={{ color: 'green' }}>Total Income: Rs {totalIncome.toLocaleString()}</Typography>
          <Typography component={'h1'} variant='h6' sx={{ color: 'red' }}>Total Expenses: Rs {totalExpense.toLocaleString()}</Typography>
          <Typography component={'h1'} variant='h6' sx={{ color: netBalance > 0 ? 'green' : 'red' }}>Net Balance: Rs {netBalance.toLocaleString()}</Typography>
        </Stack>
      </Paper>
  )
}

export default memo(ExpenseSummary)
