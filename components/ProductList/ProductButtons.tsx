'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  item: any;
};

const ProductButton = ({ item }: Props) => {
  const pathname = usePathname();

  const isAdminView = pathname.includes('admin-view');

  return isAdminView ? (
    <>
      <button className='btn'>Update</button>
      <button className='btn'>Delete</button>
    </>
  ) : (
    <>
      <button className='btn'>Add to cart</button>
    </>
  );
};

export default ProductButton;
