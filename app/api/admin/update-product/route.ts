import connectToDb from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { productSchemaToAddNewOne } from '@/utils/validation';
import Product from '@/models/product';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest) {
  try {
    await connectToDb();

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
      message: 'Product updated successfully !',
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: 'Failed to update the product',
      error,
    });
  }
}
