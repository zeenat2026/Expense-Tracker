import { api } from "./api";

export const addExpense = async (expenseData) =>{
    const response = await api.post('/expense/add-expense',expenseData);
    return response.data
}

export const getExpenses = async () =>{
    const response = await api.get('/expense/get-expense');
    return response.data
}


export const deleteExpense = async(id)=>{
    const response = await api.delete(`/expense/delete-expense/${id}`);
    return response.data
}

export const updateExpense= async(id,updatedExp) => {
    const response = await api.put(`/expense/update-expense/${id}`,updatedExp);
    return response.data
}