const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const login=async(req,res,next)=>{
    try{
        const{email,password}=req.body;
        const student=await Student.findOne({email});

        if(!student){
            return res.status(401).json({error:'Invalid email'});
        }

        const isPasswordValid= await bcrypt.compare(password,student.password);

        if(!isPasswordValid){
            return res.status(401).json({error:'Invalid password'});

        }

        // const token=jwt.sign({id: student._id},process.env.JWT_KEY);
        const token = jwt.sign({ id: student._id }, process.env.JWT_KEY || 'fallback_secret_key',{expiresIn:"1hr"});
        res.status(200).json({token});
        }catch(error){
            res.status(400).json({error:error.message});
        }
};
exports.login=login;