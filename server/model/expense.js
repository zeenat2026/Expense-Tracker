import mongoose from "mongoose";


const expenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    title:{
        type: String,
        trim: true,
        required:true
    },
    amount:{
        type : Number,
        min :[0,'Amount cannot be negative'],
        required: true
    },
       type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },

},{timestamps:true});

const Expense = mongoose.model("Expense",expenseSchema);

export default Expense 