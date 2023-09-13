import { Options } from '@/types/input';
import { IProduct } from '@/types/product';
import { Schema, model, models, Types, Model } from 'mongoose';

type SchemaType = Omit<IProduct<Types.Array<Options>>, '_id'>;

const productSchema = new Schema<SchemaType>(
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

const Product: Model<SchemaType> =
  models.Product || model<SchemaType>('Product', productSchema);

export default Product;
