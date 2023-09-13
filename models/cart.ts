import { ICart } from '@/types/cart';
import { Schema, model, models, Types, Model } from 'mongoose';

type SchemaType = ICart<Types.ObjectId>;

const cartSchema = new Schema<SchemaType>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  // timestamp for createdAt and updatedAt
  { timestamps: true }
);

const Cart: Model<SchemaType> =
  models.Cart || model<SchemaType>('Cart', cartSchema);

export default Cart;
