import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, 'Creator address is required'],
    },
    type: {
      type: String,
    },
    transaction_hash: {
      type: String,
    },
    amount: {
      type: Number,
    },
    // timestamps: {
    //   type: DateTime,
    // }
  },
  {timestamps: true},
);

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
