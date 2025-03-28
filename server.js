import express from 'express';
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client';
import login from './routes/publics/login.js';
import register from './routes/publics/register.js';
import cadastroVeiculo from './routes/privates/cadastroVeiculo.js';
import listarVeiculo from './routes/privates/listarVeiculos.js';




const app = express();
dotenv.config()

const prisma = new PrismaClient(); 

async function checkDataBaseConnection(){
    try{
        await prisma.$connect()
        console.log('Database connection has been established successfully')
    } catch (err){
        console.log(`Error connecting to the database: ${err.message}`)
        process.exit(1)
    }
}

app.listen(process.env.PORT, async () =>{
    console.log(`Server is running on port ${process.env.PORT}`)
    await checkDataBaseConnection()
})


app.use(express.json())

app.use( login)
app.use( register)
app.use(cadastroVeiculo)
app.use(listarVeiculo)




