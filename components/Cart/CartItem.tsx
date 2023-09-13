import Image from 'next/image';
import React, { useState } from 'react';
import ComponentLevelLoader from '../Loader';
import { Options } from '@/types/input';
import { IProduct } from '@/types/product';

type Props = {
  cartItem: IProduct<Options[]>;
  removeCartItem: (id: string) => void;
};

const CartItem = ({ cartItem, removeCartItem }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <li className='flex py-6'>
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
        <Image
          width={10000}
          height={10000}
          // src={cartItem.productID.imageUrl}
          src={cartItem.imageUrl}
          alt='Cart Item'
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <h3>
              {/* <a>{cartItem.productID.name}</a> */}
              <a>{cartItem.name}</a>
            </h3>
          </div>
          <p className='mt-1 text-sm text-gray-600'>
            {/* ${cartItem.productID.price} */}${cartItem.price}
          </p>
        </div>
        <div className='flex flex-1 items-end justify-between text-sm'>
          <button
            type='button'
            className='font-medium text-yellow-600 sm:order-2'
            // onClick={() => removeCartItem(cartItem._id)}
            onClick={() => removeCartItem(cartItem._id || '')}
          >
            {isLoading ? (
              <ComponentLevelLoader
                text={'Removing'}
                color={'#000000'}
                loading={isLoading}
              />
            ) : (
              'Remove'
            )}
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
