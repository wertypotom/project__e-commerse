export type IProduct<T> = {
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: T;
  deliveryInfo: string;
  onSale: 'yes' | 'no';
  priceDrop: number;
  imageUrl: string;
};
