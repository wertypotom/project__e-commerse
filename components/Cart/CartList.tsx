import { GlobalContext } from '@/context';
import React, { useContext } from 'react';
import CartItem from './CartItem';

type Props = {};

const CartList = (props: Props) => {
  const { cartItems } = useContext(GlobalContext);

  const handleRemoveCartItem = (id: string) => {};

  console.log('cartItems', cartItems);

  return (
    <ul role='list' className='my-6 divide-y divide-gray-300'>
      {cartItems.map((item) => (
        <CartItem
          cartItem={item}
          removeCartItem={handleRemoveCartItem}
          key={item._id}
        />
      ))}
    </ul>
  );
};

export default CartList;
