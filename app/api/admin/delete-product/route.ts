import connectToDb from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { productSchemaToAddNewOne } from '@/utils/validation';
import Product from '@/models/product';
import { truncate } from 'fs';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
  try {
    await connectToDb();

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
      message: 'Product deleted successfully !',
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: 'Something went wrong, please, try again',
      error,
    });
  }
}
