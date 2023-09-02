import { IProduct } from '@/types/product';
import { Schema, model, models, Types } from 'mongoose';

const productSchema = new Schema<IProduct<Types.Array<string>>>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    priceDrop: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    onSale: { type: String, required: true },
    deliveryInfo: { type: String, required: true },
    sizes: { type: [String], required: true },
  },
  // timestamp for createdAt and updatedAt
  { timestamps: true }
);

const Product =
  models.Product ||
  model<IProduct<Types.Array<string>>>('Product', productSchema);

export default Product;
