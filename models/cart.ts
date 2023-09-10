import { ICart } from '@/types/cart';
import { Schema, model, models, Types, Model } from 'mongoose';

const cartSchema = new Schema<ICart<Types.ObjectId>>(
  {
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    productID: { type: Schema.Types.ObjectId, ref: 'Products' },
    quantity: { type: Number, required: true, default: 1 },
  },
  // timestamp for createdAt and updatedAt
  { timestamps: true }
);

const Cart: Model<ICart<Types.ObjectId>> =
  models.Cart || model<ICart<Types.ObjectId>>('Cart', cartSchema);

export default Cart;
