import { Restaurant, ensureDbConnection } from "db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { restauantType } from "validation";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  try {
    await ensureDbConnection();

    // just so that get data is not cached
    const session = await getServerSession(authOptions);

    //get all the restaurant data
    const rawRestaurants: restauantType[] =
      await Restaurant.find().populate("address");

    //get all the cities we are available in
    const rawCities: string[] = rawRestaurants.map(
      (restaurant) => restaurant.address.city
    );
    const distinctCities = rawCities
      .map((city) =>
        city
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      )
      .reduce((uniqueCities: string[], city) => {
        if (!uniqueCities.includes(city)) {
          uniqueCities.push(city);
        }
        return uniqueCities;
      }, []);

    if (!distinctCities) {
      return NextResponse.json(
        { status: "error", message: "No cities found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { status: "success", cities: distinctCities },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in api/city(GET)", error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
