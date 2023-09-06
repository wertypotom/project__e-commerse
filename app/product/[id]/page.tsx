import ProductList from '@/components/ProductList';
import ProductCard from '@/components/ProductList/ProductCard';
import { getProductById, getProductsByCategory } from '@/services/product';

type Props = {
  params: {
    id: string;
  };
};

const Product = async ({ params: { id } }: Props) => {
  const data = await getProductById(id);

  if (!data?.data.product) {
    return <h1 className='mt-12 mx-auto'>No Product Found</h1>;
  }

  return <ProductCard item={data.data.product} />;
};

export default Product;
