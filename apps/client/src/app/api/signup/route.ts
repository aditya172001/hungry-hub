import { NextRequest, NextResponse } from "next/server";
import { User, ensureDbConnection } from "db";
import bcrypt from "bcryptjs";
import { emailSchema, singupSchema } from "validation";

export async function POST(request: NextRequest) {
  try {
    await ensureDbConnection();

    //validate data
    const rawUser = await request.json();
    const parsedUser = singupSchema.safeParse(rawUser);
    if (!parsedUser.success) {
      let message = "Invalid user data";
      if (rawUser?.password?.length < 4) {
        message = "password should be atleast 4 characters long";
      }
      if (!emailSchema.safeParse(rawUser.email).success) {
        message = "Invalid email";
      }

      return NextResponse.json({ status: "error", message }, { status: 400 });
    }
    const { userName, email, password } = parsedUser.data;

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
