
import { Box } from '@mui/material';
import { memo } from 'react';
import  { Legend, ResponsiveContainer, Tooltip } from 'recharts';
import  { PieChart ,Pie,Cell} from 'recharts';

const ExpenseChart = ({categoryData}) => {

  
    const chartData = categoryData.map((entry) => ({
      category: entry[0],
      amount: entry[1],
    }));

    
  return (
  <Box >
  <ResponsiveContainer width={'100%'} height={300}>
   <PieChart>
  <Tooltip />
  <Legend />
<Pie data={chartData} dataKey="amount" nameKey="category"  labelLine={false} label={(entry) => `${entry.name} : ${entry.amount}`} cx={'50%'} cy={'50%'} outerRadius={'70%'}>
   {chartData.map((entry,index)=>(
    <Cell key={index}  fill={`hsl(${(index * 360) / chartData.length}, 70%, 50%)`}/>
   ))}
</Pie>
   </PieChart>
  </ResponsiveContainer>
  </Box>
  )
}

export default memo(ExpenseChart);
