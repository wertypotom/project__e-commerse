import connectToDb from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { productSchemaToAddNewOne } from '@/utils/validation';
import Product from '@/models/product';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
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

    const response = await req.json();

    const {
      name,
      description,
      price,
      category,
      sizes,
      onSale,
      priceDrop,
      imageUrl,
    } = response;

    const { error: validationError } = productSchemaToAddNewOne.validate({
      name,
      description,
      price,
      category,
      sizes,
      onSale,
      priceDrop,
      imageUrl,
    });

    if (validationError) {
      return NextResponse.json({
        status: 'fail',
        message: validationError.message,
      });
    }

    const newProduct = await Product.create(response);

    if (!newProduct) {
      return NextResponse.json({
        status: 'fail',
        message: 'Failed to add new product',
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Product added successfully',
      data: {
        product: newProduct,
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
