import User from "../model/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const registerUser = async (req, res) => {
try {
      const {name,email,password}=req.body
      const normalizedEmail = email?.trim().toLowerCase();
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
 
      if (!name?.trim() || !normalizedEmail|| !password) {
        return res.status(400).json({message:'All fields are required'})
      }
      if(password.length < 8) {
        return res.status(400).json({message:'Password must be at least 8 characters'})
      }
           
      if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({message:"Please enter a valid email"});
      }
    const existingUser= await User.findOne({email:normalizedEmail});

    if (existingUser) {
        return res.status(400).json({message:"User already exists"});
    }
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password,salt);

const createdUser =  await User.create(
    {
        name,
       email: normalizedEmail,
        password:hashedPassword
    }
 );
 
const token = jwt.sign({id:createdUser._id},process.env.JWT_SECRET,{expiresIn:'3d'});
    res.status(201).json({
        _id:createdUser._id,
        name:createdUser.name,
        email:createdUser.email,
        token
    });
} catch (error) {
  res.status(500).json({message:error.message});
}
}
