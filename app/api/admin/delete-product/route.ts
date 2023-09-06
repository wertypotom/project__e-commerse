import connectToDb from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { productSchemaToAddNewOne } from '@/utils/validation';
import Product from '@/models/product';
import { truncate } from 'fs';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
  try {
    await connectToDb();

    // check whether user athed

    // check whether user is Admin
    const user = 'admin';

    if (user !== 'admin') {
      return NextResponse.json({
        status: 'fail',
        message: 'You are not authorized to add product',
      });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        status: 'fail',
        message: 'Product id is required',
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({
        status: 'fail',
        message: 'Failed to delete Product',
      });
    }

    return NextResponse.json({
      status: 'success',
      data: {
        product: product,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: 'Something went wrong, please, try again',
      error,
    });
  }
}
