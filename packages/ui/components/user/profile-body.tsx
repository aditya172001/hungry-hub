"use client";
import { ReactElement, useState } from "react";
import { UserAddress } from "./user-address";
import { UserOrders } from "./user-orders";
import { UserReviews } from "./user-reviews";

enum Options {
  address = "Address",
  reviews = "Reviews",
  order_history = "Order History",
}
export function ProfileBody(): ReactElement {
  const [currentOption, setCurrentOption] = useState(Options.address);

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      <div className="border border-violet-100 rounded-lg px-2 py-2">
        <div className="text-lg text-violet-500">Options</div>
        <div className="text-gray-600 hover:cursor-pointer pt-2">
          <div
            onClick={() => setCurrentOption(Options.address)}
            className={`${
              currentOption === Options.address
                ? "text-black bg-violet-200"
                : ""
            } px-2 rounded-md transition duration-300 py-1`}
          >
            {Options.address}
          </div>
          <div
            onClick={() => setCurrentOption(Options.order_history)}
            className={`${
              currentOption === Options.order_history
                ? "text-black bg-violet-200"
                : ""
            } px-2 rounded-md transition duration-300 py-1`}
          >
            {Options.order_history}
          </div>
          <div
            onClick={() => setCurrentOption(Options.reviews)}
            className={`${
              currentOption === Options.reviews
                ? "text-black bg-violet-200"
                : ""
            } px-2 rounded-md transition duration-300 py-1`}
          >
            {Options.reviews}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="text-xl font-semibold">{currentOption}</div>
        {currentOption === Options.address ? <UserAddress /> : null}
        {currentOption === Options.order_history ? <UserOrders /> : null}
        {currentOption === Options.reviews ? <UserReviews /> : null}
      </div>
    </div>
  );
}
