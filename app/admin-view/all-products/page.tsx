import ProductList from '@/components/ProductList';
import { getAllAdminProducts } from '@/services/product';
import React from 'react';

const AdminAllProducts = async () => {
  const data = await getAllAdminProducts();

  if (!data?.data.products) {
    return <h1>No Products Found</h1>;
  }
  return <ProductList data={data.data.products} />;
};

export default AdminAllProducts;
