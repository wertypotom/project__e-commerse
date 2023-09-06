import ProductList from '@/components/ProductList';
import { getProductsByCategory } from '@/services/product';

const ClientMenProducts = async () => {
  const data = await getProductsByCategory('men');

  if (!data?.data.products.length) {
    return <h1 className='mt-12 mx-auto'>No Products Found</h1>;
  }

  return <ProductList data={data.data.products} />;
};

export default ClientMenProducts;
