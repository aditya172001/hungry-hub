"use client";

import { CartDataType, ItemForCartType, ItemForUserMenuType } from "types";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { cartDataState } from "store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getQuantity(cart: CartDataType, item: ItemForUserMenuType): number {
  const myItem = cart.items.find((cartItem) => cartItem.itemID === item.itemID);
  return myItem ? myItem.quantity : 0;
}

export function UserRestaurantMenuItem({
  myItem,
  restaurantID,
}: {
  myItem: string;
  restaurantID: string;
}) {
  const item = JSON.parse(myItem) as ItemForCartType;
  const [cart, setCart] = useRecoilState(cartDataState);
  const [quantity, setQuantity] = useState(getQuantity(cart, item));

  function handleAddItemToCart() {
    if (cart.items.length === 0) {
      setCart({ items: [{ ...item, quantity: 1 }], restaurantID });
      setQuantity(1);
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
          setQuantity((quantity) => quantity + 1);
          //item already exists in cart
          if (oldCartData.items.some((it) => it.itemID === item.itemID)) {
            return {
              items: oldCartData.items.map((it) => {
                if (it.itemID === item.itemID)
                  return { ...it, quantity: it.quantity + 1 };
                else return it;
              }),
              restaurantID,
            };
          } else {
            return {
              items: [...oldCartData.items, { ...item, quantity: 1 }],
              restaurantID,
            };
          }
        }
      });
    }
  }
  function handleRemoveItemFromCart() {
    setCart((oldCartData) => {
      if (quantity === 1) {
        const updatedItems = oldCartData.items.filter(
          (oldItem) => oldItem.itemID !== item.itemID
        );
        return { ...oldCartData, items: updatedItems };
      } else {
        return {
          items: oldCartData.items.map((it) => {
            if (it.itemID === item.itemID) {
              return { ...it, quantity: it.quantity - 1 };
            } else {
              return it;
            }
          }),
          restaurantID: oldCartData.restaurantID,
        };
      }
    });
    setQuantity((quantity) => quantity - 1);
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
          {quantity > 0 ? (
            <div className="flex items-center text-sm sm:text-base select-none">
              <MinusIcon
                className="w-4 sm:w-6"
                onClick={handleRemoveItemFromCart}
              />
              <span className="w-2">{quantity}</span>
              <PlusIcon className="w-4 sm:w-5" onClick={handleAddItemToCart} />
            </div>
          ) : (
            <PlusIcon className="w-4 sm:w-5" onClick={handleAddItemToCart} />
          )}
        </div>
      </div>
    </>
  );
}
