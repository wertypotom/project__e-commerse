import connectToDb from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { cartPropsValidation } from '@/utils/validation';
import Cart from '@/models/cart';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    await connectToDb();

    const response = await req.json();

    const { productData, userId } = response;

    // console.log('response ', productData, userId);
    const user = await Cart.findOne({ user: userId });
    console.log('USER', user);

    const product = await Cart.findOneAndUpdate(
      { user: userId },
      { $push: { products: { product: productData._id } } },
      { upsert: true }
    );

    console.log('product ', product);

    // const isItemExist = await Cart.find({ productID, userID });

    // console.log('existed ', isItemExist);

    // if (!isItemExist.length) {
    //   return NextResponse.json({
    //     status: 'fail',
    //     message: 'Product is already added to cart. Add different product',
    //   });
    // }

    // const product = await Cart.create(req);

    if (!product) {
      return NextResponse.json({
        status: 'fail',
        message: 'Failed to add product to Cart',
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Product added successfully',
      data: {
        product,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: 'Something went wrong. Please try again',
      error,
    });
  }
}
