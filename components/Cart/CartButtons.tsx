import { GlobalContext } from '@/context';
import { Options } from '@/types/input';
import { IProduct } from '@/types/product';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

type Props = {
  cartItems: IProduct<Options[]>[];
};

const CartButtons = ({ cartItems }: Props) => {
  const { setShowCartModal } = useContext(GlobalContext);
  const router = useRouter();

  const goToCartPage = () => {
    router.push('/cart');
    setShowCartModal(false);
  };

  const goToCheckoutPage = () => {
    router.push('/checkout');
    setShowCartModal(false);
  };

  return (
    <React.Fragment>
      <button type='button' onClick={goToCartPage} className='btn-full'>
        Go To Cart
      </button>
      <button
        disabled={!cartItems.length}
        type='button'
        onClick={goToCheckoutPage}
        className='btn-full'
      >
        Checkout
      </button>
      <div className='mt-6 flex justify-center text-center text-sm text-gray-600'>
        <button type='button' className='font-medium text-grey'>
          Continue Shopping
          <span aria-hidden='true'> &rarr;</span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default CartButtons;
