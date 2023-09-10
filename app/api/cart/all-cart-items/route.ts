import connectToDb from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { cartPropsValidation } from '@/utils/validation';
import Cart from '@/models/cart';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        status: 'fail',
        message: 'Something went wrong. Please try again',
      });
    }

    const userCartItems = await Cart.find({ userID: id })
      .populate('userID')
      .populate('productID');

    if (!userCartItems) {
      return NextResponse.json({
        status: 'fail',
        message: 'No cart items found',
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Product added successfully',
      data: {
        products: userCartItems,
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
