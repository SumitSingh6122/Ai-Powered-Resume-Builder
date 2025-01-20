import express from 'express';
import { createResume, deleteResume, getResumeById, getUserResumes, updateResume } from '../Controller/Resumecontroller.js';
import { authMiddleware } from '../middelware/authMiddleware.js';

const Resumerouter=express.Router();
Resumerouter.post("/", authMiddleware,createResume); 
Resumerouter.get("/hello",(req,res)=>{
    return res.json({ message:"hello brother"});
});
Resumerouter.get("/", authMiddleware, getUserResumes); 
Resumerouter.get("/:id",authMiddleware, getResumeById); 
Resumerouter.put("/:id",authMiddleware, updateResume); 
Resumerouter.delete("/:id",authMiddleware, deleteResume);

export default Resumerouter;