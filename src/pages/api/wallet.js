import { CosmWasmClient } from 'secretjs';

export default async (req, res) => {
    const {
      address,
    } = req.body;

    try {
        const client = new CosmWasmClient(process.env.NEXT_PUBLIC_SECRET_REST_URL);
        const account = await client.getAccount(address);
        res.status(201).send(account);
    } catch (error) {
        res.status(500).send(error.message);
    }
    res.end();
};