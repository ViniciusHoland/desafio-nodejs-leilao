import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()


router.get('/veiculos', async (req, res) => {

    try{

        const auctions = await prisma.auction.findMany({
            include: {
                bids: true,
                user: true
            }
        })

        const response = auctions.map((auction) => {

            return {
                brand: auction.brand,
                modelo: auction.modelo,
                startPrice: auction.startPrice,
                highestbid: auction.highestBidderId,
                status: auction.status,
                dataTermino : auction.expiration,
            }


        })

        res.status(200).json(response)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'error ao buscar veiculos de leilao' })
    }


})

export default router