import User from "../model/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
    const {email,password} = req.body
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !password) {
        return res.status(400).json({message:"All fields are required"});
    }
    try {
        const user = await User.findOne({email:normalizedEmail});
        if (!user) {
    return res.status(400).json({message:"Invalid credentials"}); 
        }
    const isMatched = await bcrypt.compare(password,user.password);
    if (!isMatched) {
        return res.status(400).json({message:"Invalid credentials"});
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'3d'});
    res.status(200).json({
        name:user.name,
        email:user.email,
        token
    })
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}



