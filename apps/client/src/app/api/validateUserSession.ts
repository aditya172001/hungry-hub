import { User } from "db";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

//used for getting user info of current logged in user
export async function validateUserSession(session: Session | null) {
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(
      { error: "Invalid user session" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json(
      { status: "error", message: "User not found" },
      { status: 404 }
    );
  }

  return user;
}
