"use client";
import { useState, type ReactElement, useCallback } from "react";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid";
import { itemPostType } from "validation";
import { useRouter, useSearchParams } from "next/navigation";
import { DeleteItemFromMenuModal } from "./modal-delete-item-from-menu";

interface ItemType extends itemPostType {
  _id: string;
}

export function IndividualMenuItem({
  item,
  restaurantID,
}: {
  item: string;
  restaurantID: string;
}): ReactElement {
  const [isopen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const myItem = JSON.parse(item) as ItemType;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex items-center justify-between space-x-4">
      <div
        className="flex items-center justify-between w-full bg-white p-4 rounded-md border border-violet-200 my-2 "
        onClick={() => setIsOpen((isopen) => !isopen)}
      >
        <div>
          <div className="grid grid-cols-7 items-center">
            <img
              src={myItem.imageURL}
              alt="item image"
              className="h-24 w-36 object-cover rounded-md col-span-1"
            />
            <div className="col-span-6 pl-2">
              <div>
                <span className="font-light">Item : </span>
                <span className="font-semibold">{myItem.itemName}</span>
              </div>
              <div>
                <span className="font-light">Description : </span>
                <span className="font-semibold">{myItem.description}</span>
              </div>
              <div>
                <span className="font-light">Price : ₹</span>
                <span className="font-semibold">{myItem.price}</span>
              </div>
            </div>
          </div>
          <div
            className={`${
              isopen ? " h-20 mt-2" : "h-0"
            } overflow-hidden duration-300 ease-in-out`}
          >
            <div>
              <div>
                <span className="font-light">Cuisine : </span>
                <span className="font-semibold">{myItem.cuisine}</span>
              </div>
              <div>
                <span className="font-light">Course : </span>
                <span className="font-semibold">{myItem.course}</span>
              </div>
              <div>
                <span className="font-light">Veg : </span>
                <span
                  className={`font-semibold ${
                    myItem.veg ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {myItem.veg ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <ChevronDownIcon
          className={`h-5 w-5 text-violet-400 ${
            isopen ? "rotate-180" : "rotate-0"
          } duration-300`}
        />
      </div>
      <div className="w-5">
        <PencilIcon
          className="text-violet-500"
          onClick={() =>
            router.push(
              `/restaurants/${restaurantID}/edit-item` +
                "?" +
                createQueryString("itemID", `${myItem._id}`)
            )
          }
        />
        <DeleteItemFromMenuModal
          itemID={myItem._id}
          restaurantID={restaurantID}
        />
      </div>
    </div>
  );
}
