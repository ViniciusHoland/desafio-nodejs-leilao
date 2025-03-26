import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router()
const prisma = new PrismaClient();


router.post('/login', async () => {

    try{



    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'erro ao tentar fazer login' })
    }


})

export default router




