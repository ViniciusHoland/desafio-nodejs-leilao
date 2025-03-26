import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router()
const prisma = new PrismaClient();


router.post('/login', async (req, res) => {

    try{

        const {email , password} = req.body

        const user = await prisma.user.findUnique({
            where: {
                email : email,
            }
        })

        if(!user){
            return res.status(401).json({ error: 'Usuário não encontrado'})
        }
        if(user.password !== password){
            return res.status(401).json({ error: 'Senha inválida'})
        }

        res.status(200).json({ message: "usuario logado com sucesso" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'erro ao tentar fazer login' })
    }


})

export default router




