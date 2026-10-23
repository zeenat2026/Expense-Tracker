import { Grid, TextField, MenuItem } from '@mui/material';

const categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Salary', 'Other'];
const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

const ExpenseFilters = ({filterExpense,handleOnChange,searchTerm,setSearchTerm}) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
     <Grid size={{xs:12 , sm:6 , md:4 , lg:3}}>
      
          <TextField
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          label="Search by title"
          variant="outlined"
          size="small"
          fullWidth
        />
      
   </Grid>
     <Grid size={{xs:12 , sm:6 , md:4 , lg:3}}>
         <TextField
          select
          label=" type"
          name='type'
          variant="outlined"
          size="small"
          fullWidth
          value={filterExpense.type}
          onChange={handleOnChange}
        >
          <MenuItem value=''>All</MenuItem>
          <MenuItem value='expense'>Expense</MenuItem>
          <MenuItem value='income'>Income</MenuItem>
        </TextField></Grid>

        <Grid size={{xs:12 , sm:6 , md:4 , lg:3}}>
          <TextField
          select
          label="category"
          name='category'
          variant="outlined"
          size="small"
          fullWidth
          value={filterExpense.category}
          onChange={handleOnChange}
        >{categories.map((cat) =>
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
        </TextField>
        </Grid>
   
   <Grid size={{xs:12 , sm:6 , md:4 , lg:3}}>
          <TextField
          select
          label="month"
          name='month'
          value={filterExpense.month}
          variant="outlined"
          size="small"
          fullWidth
          onChange={handleOnChange}

        >{months.map((m) => <MenuItem value={m.value}>{m.label}</MenuItem>)}</TextField>
   
     </Grid>
       </Grid>
  )
}

export default ExpenseFilters
