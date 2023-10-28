"use client";
import { useState, type ReactElement } from "react";
import {
  ChevronDownIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/20/solid";
import { ReviewType } from "types";

export function IndividualReview({
  review,
}: {
  review: ReviewType;
}): ReactElement {
  const [isopen, setIsOpen] = useState(false);
  return (
    <div
      className="bg-white p-4 rounded-md border border-violet-200 my-2"
      onClick={() => setIsOpen((isopen) => !isopen)}
    >
      <div className="flex justify-between items-center ">
        <div className="flex items-center space-x-4">
          <div
            className="bg-cover bg-center h-10 w-10 rounded-md"
            style={{
              backgroundImage: `url(${review.restaurantProfilePicture})`,
            }}
          />
          <div>
            <div>
              <span className="font-light">Restaurant : </span>
              <span className="font-semibold">{review.restaurantName}</span>
            </div>
            <div>
              <span className="font-light">Items : </span>{" "}
              <span className="font-semibold">{review.items.length}</span>
            </div>
          </div>
        </div>
        <ChevronDownIcon
          className={`h-5 w-5 text-violet-400 ${
            isopen ? "rotate-180" : "rotate-0"
          } duration-300`}
        />
      </div>
      <div
        className={`${
          isopen ? "h-32" : "h-0"
        } overflow-hidden duration-300 ease-in-out`}
      >
        <div className="pl-14">
          <div>
            <span className="font-light">Rating : </span>
            <span className="font-semibold">{review.rating}</span>
          </div>
          <div>
            <span className="font-light">Review Text : </span>
            <span className="font-semibold">
              {review.reviewText ? review.reviewText : "NA"}
            </span>
          </div>
          <div>
            <span className="font-light">Delivery Address : </span>
            <span className="font-semibold">{`${review.deliveryAddress.street}, ${review.deliveryAddress.city}`}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClipboardDocumentListIcon className="h-4" />
            <div className="font-semibold">Items :-</div>
          </div>
          <div className="flex space-x-5">
            {review.items.map((item, index) => (
              <div key={index} className=" text-sm font-light text-violet-600">
                {item.itemName}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
