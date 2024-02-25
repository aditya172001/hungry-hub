import { NextRequest, NextResponse } from "next/server";
import { User, ensureDbConnection } from "db";
import bcrypt from "bcryptjs";
import { emailSchema, singupSchema } from "validation";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    await ensureDbConnection();

    //validate data
    const rawUser = await request.json();
    let parsedUser;
    try {
      parsedUser = singupSchema.parse(rawUser);
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            status: "error",
            message: error.errors[0].message,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { status: "error", message: "Invalid Input" },
        { status: 400 }
      );
    }
    const { userName, email, password } = parsedUser;

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return NextResponse.json(
        { status: "error", message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashedPassword });
    const savedUser = await newUser.save();
    if (!savedUser) {
      return NextResponse.json(
        { status: "error", message: "Couldn't create user" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { status: "success", message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("error at api/signup", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
