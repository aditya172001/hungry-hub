import { NextRequest, NextResponse } from "next/server";
import { Item, ensureDbConnection } from "db";
import {
  citySchema,
  cuisineSchema,
  courseSchema,
  vegSchema,
  searchSchema,
} from "validation";

import type { cuisineType, courseType, vegType } from "validation";

interface queryType {
  cuisine?: cuisineType;
  course?: courseType;
  veg?: vegType;
}

//api not being used anywhere
//route used for filtering the dishes in a city
export async function GET(req: NextRequest) {
  try {
    await ensureDbConnection();

    //data validation
    const rawCity = req.headers.get("city");
    const rawCuisine = req.headers.get("cuisine");
    const rawCourse = req.headers.get("course");
    const rawVeg = req.headers.get("veg");
    let rawSearch = req.headers.get("search");

    const parsedCity = citySchema.safeParse(rawCity);
    const parsedCuisine = cuisineSchema.safeParse(rawCuisine);
    const parsedCourse = courseSchema.safeParse(rawCourse);
    const parsedVeg = vegSchema.safeParse(rawVeg);
    const parsedSearch = searchSchema.safeParse(rawSearch);
    if (
      !parsedCity.success ||
      !parsedCuisine.success ||
      !parsedCourse.success ||
      !parsedVeg.success ||
      !parsedSearch.success
    ) {
      return NextResponse.json(
        { status: "error", message: "Invalid input" },
        { status: 400 }
      );
    }

    const city = parsedCity.data;
    const reqCuisine = parsedCuisine.data;
    const reqCourse = parsedCourse.data;
    const reqVeg = parsedVeg.data;
    let reqSearch = parsedSearch.data;
    //zod validation

    const query: queryType = {};

    //basic filters
    if (reqCuisine) query.cuisine = reqCuisine;
    if (reqCourse) query.course = reqCourse;
    if (reqVeg) query.veg = reqVeg;

    let items = await Item.find(query).populate({
      path: "restaurant",
      populate: {
        path: "address",
      },
    });

    // apply extra filters
    if (reqSearch) {
      reqSearch = reqSearch.toLowerCase();
      items = items.filter((item) => {
        return (
          (item.itemName.toLowerCase().includes(reqSearch) ||
            item.description.toLowerCase().includes(reqSearch) ||
            item.restaurant.restaurantName.toLowerCase().includes(reqSearch)) &&
          item.restaurant.address.city.toLowerCase() === city?.toLowerCase()
        );
      });
    }

    //if no items left return
    if (!items || items.length === 0)
      return NextResponse.json(
        { status: "error", message: "No items found" },
        { status: 404 }
      );

    //customise the data to be sent
    items = items.map((item) => {
      return {
        restaurantID: item.restaurant._id,
        itemName: item.itemName,
        description: item.description,
        imageURL: item.imageURL,
        price: item.price,
        cuisine: item.cuisine,
        course: item.course,
        veg: item.veg,
      };
    });

    return NextResponse.json({ status: "success", items }, { status: 200 });
  } catch (error) {
    console.error("error in api/dishes(GET)", error);
    return NextResponse.json(
      { status: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
