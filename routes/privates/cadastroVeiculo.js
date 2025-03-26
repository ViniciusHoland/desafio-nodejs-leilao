import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.post('/cadastro/veiculo', async (req, res) => {

    try{

        console.log(req.body)

        let { modelo, brand, year, startPrice, expiration, userId} = req.body

        if(!modelo ||!brand ||!year ||!startPrice ||!expiration){
            return res.status(400).json({ message: "Preencha todos os campos"})
        }

        year = Number(year)
        startPrice = Number(startPrice)
        userId = Number(userId)

        if(isNaN(year) || year <= 0){
            return res.status(400).json({ message: "Ano do veiculo precisa ser um numero positivo"})
        }

        if(isNaN(startPrice) || startPrice <= 0 || typeof startPrice !== "number" ){
            return res.status(400).json({ message: "Preco inicial precisa ser um numero positivo e maior que zero"})
        }

        const data = new Date(expiration)
        if(isNaN(data.getTime())){
            return res.status(400).json({ message: "Data de expiracao precisa ser uma data valida"})
        }

        const newVeiculo = await prisma.auction.create({
            data: {
                modelo,
                brand,
                year,
                startPrice,
                expiration: data,
                userId
            }
        })

        res.status(201).json(newVeiculo)
  
    } catch (err) {
        res.status(500).json({ message: "error ao cadastrar veiculo para leilao"})
    }


})

export default router