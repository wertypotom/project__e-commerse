import connectToDb from '@/database';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import { compare, hash } from 'bcryptjs';
import { userSchemaForValidationOnLogin } from '@/utils/validation';
import jwt from 'jsonwebtoken';

// 'force-dynamic': Force dynamic rendering and uncached data fetching of a layout or page by disabling all caching of fetch requests and always revalidating.
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  await connectToDb();

  const { email, password } = await req.json();

  const { error } = userSchemaForValidationOnLogin.validate({
    email,
    password,
  });

  // Validation Error
  if (error)
    return NextResponse.json({
      status: 'fail',
      message: 'Some of your fields are incorrectly filled',
    });

  // The login itself
  try {
    // check if user found
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        status: 'fail',
        message: `User with such email ${email} was not found`,
      });
    }

    // check if password was correct
    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      return NextResponse.json({
        status: 'fail',
        message: `Incorrect password for user, with email ${email}`,
      });
    }

    // generate token before expiration
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      'super-secret-key',
      { expiresIn: '1d' }
    );

    const finalData = {
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    };

    return NextResponse.json({
      status: 'success',
      message: 'Login was successfull',
      data: finalData,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',
      message: 'Something went wrong during Login, please try again',
    });
  }
}
