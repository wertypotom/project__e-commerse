import { Options } from '@/types/input';
import { IProduct } from '@/types/product';
import { Schema, model, models, Types } from 'mongoose';

const productSchema = new Schema<IProduct<Types.Array<Options>>>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    priceDrop: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    onSale: { type: String, required: true },
    deliveryInfo: { type: String, required: true },
    sizes: { type: [{ value: String, label: String }], required: true },
  },
  // timestamp for createdAt and updatedAt
  { timestamps: true }
);

const Product =
  models.Product ||
  model<IProduct<Types.Array<Options>>>('Product', productSchema);

export default Product;
