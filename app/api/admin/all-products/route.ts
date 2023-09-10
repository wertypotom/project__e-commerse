import connectToDb from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { productSchemaToAddNewOne } from '@/utils/validation';
import Product from '@/models/product';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectToDb();

    const allProducts = await Product.find({});

    if (!allProducts) {
      return NextResponse.json({
        status: 'fail',
        message: 'No products found',
      });
    }

    return NextResponse.json({
      status: 'success',
      data: {
        products: allProducts,
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
