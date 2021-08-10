// import { CosmWasmClient } from 'secretjs';
import connectMongo from '../../../mongodb';
import Transaction from '../../../models/Transaction';

export default async (req, res) => {
    await connectMongo();

    try {
        const transactions = await Transaction.find({type: "donate"}).limit(9).sort( '-createdAt' );
        res.status(201).send(transactions);
    } catch (error) {
        res.status(500).send(error.message);
    }
    res.end();
};