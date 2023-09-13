'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import ComponentLevelLoader from '../Loader';
import { IProduct } from '@/types/product';
import { Options } from '@/types/input';

type Props = {
  cartItems: IProduct<Options[]>[];
  deleteCartItem: (id: string) => void;
};

const Cart = ({ cartItems = [], deleteCartItem }: Props) => {
  const [isLoading, setIsLoading] = useState();
  const router = useRouter();

  const renderTotalPrice = useMemo(
    // () => cartItems.reduce((total, item) => item.productID.price + total, 0),
    // [cartItems]
    () => 0,
    []
  );

  return (
    // <section className='h-screen bg-gray-100'>
    //   <div className='mx-auto px-4 sm:px-6 lg:px-8'>
    //     <div className='mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8'>
    //       <div className='bg-white shadow'>
    //         <div className='px-4 py-6 sm:px-8 sm:py-10'>
    //           <div className='flow-root'>
    //             {cartItems && cartItems.length ? (
    //               <ul className='-my-8'>
    //                 {cartItems.map((cartItem) => (
    //                   <li
    //                     className='flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0'
    //                     key={cartItem.id}
    //                   >
    //                     <div className='shrink-0'>
    //                       <Image
    //                         width={10000}
    //                         height={10000}
    //                         src={cartItem.productID.imageUrl}
    //                         alt='Product image'
    //                         className='h-24 w-25 max-w-full rounded-lg object-cover'
    //                       />
    //                     </div>
    //                     <div className='flex flex-1 flex-col justify-between'>
    //                       <div className='sm:col-gap-5 sm:grid sm:grid-cols-2'>
    //                         <div className='pr-8 sm:pr-4'>
    //                           <p className='text-base font-semibold text-gray-900'>
    //                             {cartItem.productID.name}
    //                           </p>
    //                         </div>
    //                         <div className='mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end'>
    //                           <p className='shrink-0 w-20 text-base font-semibold text-gray-950 sm:order-1 sm:ml-8 sm:text-right'>
    //                             ${cartItem.productID.price}
    //                           </p>
    //                           <button
    //                             type='button'
    //                             className='font-medium text-yellow-700 sm:order-2'
    //                             onClick={() => deleteCartItem(cartItem._id)}
    //                           >
    //                             {isLoading ? (
    //                               <ComponentLevelLoader
    //                                 text={'Removing'}
    //                                 color={'#0000000'}
    //                                 loading={isLoading}
    //                               />
    //                             ) : (
    //                               'Remove'
    //                             )}
    //                           </button>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </li>
    //                 ))}
    //               </ul>
    //             ) : (
    //               <h1 className='font-bold text-lg'>Your cart is Empty !</h1>
    //             )}
    //           </div>
    //           <div className='mt-6 border-t border-b py-2'>
    //             <div className='flex items-center justify-between'>
    //               <p className='text-sm text-gray-400'>Subtotal</p>
    //               <p className='text-lg text-black font-semibold'>
    //                 $
    //                 {cartItems && cartItems.length
    //                   ? cartItems.reduce(
    //                       (total, item) => item.productID.price + total,
    //                       0
    //                     )
    //                   : '0'}
    //               </p>
    //             </div>
    //             <div className='flex items-center justify-between'>
    //               <p className='text-sm text-gray-400'>Shipping</p>
    //               <p className='text-lg text-black font-semibold'>$0</p>
    //             </div>
    //             <div className='flex items-center justify-between'>
    //               <p className='text-sm text-gray-400'>Total</p>
    //               <p className='text-lg text-black font-semibold'>
    //                 ${cartItems.length ? renderTotalPrice() : '0'}
    //               </p>
    //             </div>
    //             <div className='mt-5 text-center'>
    //               <button
    //                 onClick={() => router.push('/checkout')}
    //                 disabled={!cartItems.length}
    //                 className='btn'
    //               >
    //                 Checkout
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <></>
  );
};

export default Cart;
