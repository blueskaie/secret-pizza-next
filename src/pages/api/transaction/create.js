import connectMongo from '../../../mongodb';
import Transaction from '../../../models/Transaction';

export default async (req, res) => {
  await connectMongo();

  const {
    address,
    type,
    transaction_hash,
    amount
  } = req.body;
  try {
    const transaction = new Transaction({
      address,
      type,
      transaction_hash,
      amount
    });
    const result = await transaction.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
  res.end();
};
