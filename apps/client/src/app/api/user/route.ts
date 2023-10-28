import { NextResponse, NextRequest } from "next/server";
import { ensureDbConnection, User, Address } from "db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { validateUserSession } from "../validateUserSession";
import { addressType, userSchema } from "validation";

//user to get user info
export async function GET(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get user info
    const session = await getServerSession(authOptions);
    const myUser = await validateUserSession(session);
    await myUser.populate("address");

    //at frontend check if user address exists. if it does then continute with the order else redirect user to update profile
    return NextResponse.json(
      { status: "success", user: myUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in api/user/profile(GET)", error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

interface UserDataType {
  userName?: string;
  profilePicture?: string;
  userType?: string;
  address?: string;
}

//update user profile info
export async function PUT(request: NextRequest) {
  try {
    await ensureDbConnection();

    //get user info
    const session = await getServerSession(authOptions);
    const oldUserData = await validateUserSession(session);

    //validate userdata
    const rawUser = await request.json();
    const parsedUser = userSchema.safeParse(rawUser);
    if (!parsedUser.success) {
      return NextResponse.json(
        { status: "error", message: "Invalid input" },
        { status: 400 }
      );
    }
    const { userName, profilePicture, userType, address } = parsedUser.data;

    let updatedUserData: UserDataType = {};
    if (userName) updatedUserData.userName = userName;
    if (profilePicture) updatedUserData.profilePicture = profilePicture;
    if (userType) updatedUserData.userType = userType;

    if (address) {
      const { street, city, state, postalCode, country } = address;
      let updatedAddress: addressType = {
        street,
        city,
        state,
        postalCode,
        country,
      };

      //update address
      if (oldUserData.address) {
        const ID = oldUserData.address;
        await Address.findByIdAndUpdate(ID, updatedAddress);
      } else {
        const newAddress = new Address(updatedAddress);
        const savedAddress = await newAddress.save();
        updatedUserData.address = savedAddress._id;
      }
    }

    //update user
    await User.findByIdAndUpdate(oldUserData._id, updatedUserData);

    return NextResponse.json(
      { status: "success", message: "User data updated sucessfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in api/user/profile(PUT)", error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
