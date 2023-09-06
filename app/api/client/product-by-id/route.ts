import connectToDb from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { productSchemaToAddNewOne } from '@/utils/validation';
import Product from '@/models/product';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    // check whether user athed

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const product = await Product.findById(id);

    console.log('product  ', product);

    if (!product) {
      return NextResponse.json({
        status: 'fail',
        message: 'Could not find the product',
      });
    }

    return NextResponse.json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: 'Failed to load the products',
      error,
    });
  }
}
