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
    const category = searchParams.get('category');

    const allProducts = await Product.find(category ? { category } : {});

    return NextResponse.json({
      status: 'success',
      data: {
        products: allProducts || [],
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
