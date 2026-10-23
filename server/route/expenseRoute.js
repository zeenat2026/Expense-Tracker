import { addExpense, deleteExpense, getExpenses ,updateExpense} from "../controller/expenseController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-expense", authMiddleware,addExpense);
router.get('/get-expense',authMiddleware,getExpenses)
router.delete('/delete-expense/:id',authMiddleware,deleteExpense);
router.put('/update-expense/:id',authMiddleware,updateExpense);

export default router;