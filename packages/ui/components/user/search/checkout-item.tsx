import { MinusIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "lucide-react";
import { useRecoilState } from "recoil";
import { cartDataState } from "store";
import { ItemForCartType } from "types";

export function CheckoutItem({ item }: { item: ItemForCartType }) {
  const [cart, setCart] = useRecoilState(cartDataState);

  function handleAddItemToCart() {
    setCart((oldCartData) => {
      return {
        items: oldCartData.items.map((it) => {
          if (it.itemID === item.itemID)
            return { ...it, quantity: it.quantity + 1 };
          else return it;
        }),
        restaurantID: cart.restaurantID,
      };
    });
  }

  function handleRemoveItemFromCart() {
    setCart((oldCartData) => {
      if (item.quantity === 1) {
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
  }
  return (
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
          <div className="py-1 text-lg font-semibold">{item.itemName}</div>
          <div className="text-gray-700">{item.description}</div>
          <div className="py-1">₹{item.price}</div>
        </div>
      </div>
      <div className="flex items-center justify-center min-w-fit px-2 hover:cursor-pointer">
        <div className="flex items-center text-sm sm:text-base select-none">
          <MinusIcon
            className="w-4 sm:w-6"
            onClick={handleRemoveItemFromCart}
          />
          <span className="w-2">{item.quantity}</span>
          <PlusIcon className="w-4 sm:w-6" onClick={handleAddItemToCart} />
        </div>
      </div>
    </div>
  );
}
