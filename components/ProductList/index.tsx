'use client';

import React, { useEffect } from 'react';
import ProductTile from './ProductTile';
import ProductButtons from './ProductButtons';
import { IProduct } from '@/types/product';
import { Options } from '@/types/input';
import { useRouter } from 'next/navigation';

type Props = {
  data: IProduct<Options[]>[];
};

const ProductList = ({ data }: Props) => {
  const router = useRouter();

  useEffect(() => {
    // refresh page, because it is client component
    router.refresh();
  }, [router]);

  return (
    <section className='bg-white py-2 sm:py-0'>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16'>
          {data.length &&
            data.map((item) => (
              <article
                className='relative flex flex-col overflow-hidden border cursor-pointer'
                key={item._id}
              >
                <ProductTile item={item} />
                <ProductButtons item={item} />
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
