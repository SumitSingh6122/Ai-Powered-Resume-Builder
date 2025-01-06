import express from 'express';
import dotenv from 'dotenv';
import { DBConnection } from './Utils/DConnection.js';
import AuthRoutes from './Routes/Route.js';
import cors from 'cors';



dotenv.config();

const app=express();
const port=3000;
DBConnection();
app.use(express.json());

app.use(cors());

app.use("/api/v1",AuthRoutes);

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})