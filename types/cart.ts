export type ICart<T> = {
  user: T;
  products: {
    product: T;
    quantity: number;
  }[];
};
