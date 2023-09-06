import ProductList from '@/components/ProductList';
import { getProductsByCategory } from '@/services/product';

const ClientKidsProducts = async () => {
  const data = await getProductsByCategory('kids');

  if (!data?.data.products.length) {
    return <h1 className='mt-12 mx-auto'>No Products Found</h1>;
  }

  return <ProductList data={data.data.products} />;
};

export default ClientKidsProducts;
