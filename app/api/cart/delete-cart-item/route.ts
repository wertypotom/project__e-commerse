import connectToDb from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { cartPropsValidation } from '@/utils/validation';
import Cart from '@/models/cart';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        status: 'fail',
        message: 'Item id is required',
      });
    }

    const cartItem = await Cart.findByIdAndDelete(id);

    if (!cartItem) {
      return NextResponse.json({
        status: 'fail',
        message: 'Failed to delete item from cart',
      });
    }

    return NextResponse.json({
      status: 'success',
      data: {
        product: cartItem,
      },
      message: 'Item deleted successfully !',
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: 'Something went wrong. Please try again',
      error,
    });
  }
}
