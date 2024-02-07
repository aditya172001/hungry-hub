"use client";

import { ItemForUserMenuType } from "types";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { cartDataState } from "store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function UserRestaurantMenuItem({
  myItem,
  restaurantID,
}: {
  myItem: string;
  restaurantID: string;
}) {
  const item = JSON.parse(myItem) as ItemForUserMenuType;
  const [cart, setCart] = useRecoilState(cartDataState);
  const [itemAdded, setItemAdded] = useState(
    cart.items.some((cartItem) => cartItem.itemID === item.itemID)
  );

  function handleAddItemToCart() {
    if (cart.items.length === 0) {
      setCart({ items: [item], restaurantID });
      setItemAdded(true);
    } else {
      setCart((oldCartData) => {
        if (restaurantID !== oldCartData.restaurantID) {
          toast.error(
            "Items from different restaurants can't be ordered at the same time",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
          return oldCartData;
        } else {
          setItemAdded(true);
          return { items: [...oldCartData.items, item], restaurantID };
        }
      });
    }
  }
  function handleRemoveItemFromCart() {
    setCart((oldCartData) => {
      const updatedItems = oldCartData.items.filter(
        (oldItem) => oldItem.itemID !== item.itemID
      );
      return { ...oldCartData, items: updatedItems };
    });
    setItemAdded(false);
  }
  return (
    <>
      <ToastContainer />
      <div className="flex justify-between space-x-5 py-2 border border-transparent  px-2 rounded-md hover:border-gray-300 hover:shadow">
        <div className="flex space-x-2">
          <div className="relative min-w-fit">
            <img
              src={item.imageURL}
              alt="item image"
              className=" w-32 h-32 object-cover rounded-md"
            />
            <img
              src={item.veg ? "/veg.png" : "/non-veg.png"}
              alt="veg icon"
              className="absolute top-0 right-0 h-4 w-4 bg-white"
            />
          </div>
          <div>
            <div className="py-1 text-base sm:text-lg font-semibold">
              {item.itemName}
            </div>
            <div className="text-sm sm:text-base text-gray-700">
              {item.description}
            </div>
            <div className="text-sm sm:text-base py-1">₹{item.price}</div>
          </div>
        </div>
        <div
          className={`flex items-center justify-center px-2 hover:cursor-pointer `}
        >
          <div
            className={`transition-all duration-300 ${
              itemAdded ? "rotate-180" : "rotate-90"
            }`}
          >
            {itemAdded ? (
              <MinusIcon className="w-6" onClick={handleRemoveItemFromCart} />
            ) : (
              <PlusIcon className="w-6" onClick={handleAddItemToCart} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
