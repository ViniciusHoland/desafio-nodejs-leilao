import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router()
const prisma = new PrismaClient();


router.post('/register', async (req , res) => {

    try{

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }
      
        const user = await prisma.user.findUnique({ where : {email: email} })

        if(user) {
            return res.status(400).json({ error: "Email já cadastrado"})
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        res.status(201).json(newUser)

    } catch (error) {
        res.status(500).json({ error: "error ao registrar usuario"})
    }


})

export default router