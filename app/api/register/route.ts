import connectToDb from '@/database';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { userSchemaForValidationOnRegistration } from '@/utils/validation';

// 'force-dynamic': Force dynamic rendering and uncached data fetching of a layout or page by disabling all caching of fetch requests and always revalidating.
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  await connectToDb();

  const { name, email, password, role } = await req.json();

  const { error } = userSchemaForValidationOnRegistration.validate({
    name,
    email,
    password,
    role,
  });

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
        message: `User with such email ${email} already exists`,
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
        data: {
          user: newUser,
        },
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
