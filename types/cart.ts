import { Types } from 'mongoose';

export type ICart<T> = {
  userID: T;
  productID: T;
  quantity: number;
};
