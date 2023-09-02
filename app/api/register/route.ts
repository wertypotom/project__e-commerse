import connectToDb from '@/database';
import User from '@/models/user';
import Joi from 'joi';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

// Joi is used for validation purposes
const schema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  role: Joi.string().required(),
});

// 'force-dynamic': Force dynamic rendering and uncached data fetching of a layout or page by disabling all caching of fetch requests and always revalidating.
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  await connectToDb();

  const { name, email, password, role } = await req.json();

  const { error } = schema.validate({ name, email, password, role });

  // Validation Error
  if (error)
    return NextResponse.json({
      status: 'fail',
      message: 'Some of your fields are incorrectly filled',
    });

  // The registartion itself
  try {
    // check if user already exist
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return NextResponse.json({
        status: 'fail',
        message: 'User with such email already exists',
      });
    }

    // Create new user
    const hashPassword = await hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    if (newUser) {
      return NextResponse.json({
        status: 'success',
        message: 'Account created successfully',
      });
    }
  } catch (error) {
    console.log('Error in new user registartion');

    return NextResponse.json({
      status: 'fail',
      message: 'Something went wrong, please try again',
    });
  }
}
