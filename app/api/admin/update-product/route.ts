import connectToDb from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { productSchemaToAddNewOne } from '@/utils/validation';
import Product from '@/models/product';
import { truncate } from 'fs';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest) {
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
      _id,
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

    const product = await Product.findOneAndUpdate({ _id }, response, {
      new: true,
    });

    if (!product) {
      return NextResponse.json({
        status: 'fail',
        message: 'Failed to update Product',
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
      message: 'Failed to update the product',
      error,
    });
  }
}
