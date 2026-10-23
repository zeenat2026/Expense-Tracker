import Expense from "../model/expense.js";

export const addExpense = async (req,res )=>{
  try {
const {title,amount,type,category,date}= req.body;
if(!title || !amount || !type || !category || !date){
  return res.status(400).json({message:"All fields are required"});
}
if(amount<0){
  return res.status(400).json({message:"Amount cannot be negative"});
}
const expense = await Expense.create({
    user:req.user._id,
    title,
    amount,
    type,
    category,
    date:date || Date.now()});

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

export const getExpenses = async (req,res) =>{
  try {
    const expenses = await Expense.find({user:req.user._id}).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteExpense =async (req,res) =>{
  try {
const deleteExpense = await Expense.findOneAndDelete({
  _id:req.params.id,
  user:req.user._id
});
   if(!deleteExpense){
        return res.status(404).json({message:'Expense Not Found'});
   }
    
    res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}


export const updateExpense = async (req,res) =>{
  try {
    const {title,amount,type,category,date}= req.body;
 
    const updatedExpense = await Expense.findOneAndUpdate({
      _id:req.params.id,
      user:req.user._id
    },{title,amount,type,category,date},
    {returnDocument:'after',runValidators:true}
  );
    if(!updatedExpense){
     return res.status(404).json({message:'Expense Not Found'});
     }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}