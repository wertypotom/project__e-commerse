export interface IProduct<T> {
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: T;
  deliveryInfo: string;
  onSale: 'yes' | 'no';
  priceDrop: number;
  imageUrl: string;
}

export interface IProductWithServerId<T> extends IProduct<T> {
  _id: string;
}
