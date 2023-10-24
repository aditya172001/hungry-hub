"use client";

import { useRecoilValue } from "recoil";
import { cartDataState, cartPriceState } from "store";
import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import { CheckoutItem } from "./checkout-item";
import { OrderPlaceModal } from "./order-place-modal";

export function CheckoutBody() {
  const cart = useRecoilValue(cartDataState);
  const cartPrice = useRecoilValue(cartPriceState);
  const { items } = cart;

  async function handleCheckout() {}

  return (
    <div>
      <div className="flex items-center justify-between pt-3 pb- text-xl text-gray-700 font-semibold">
        <div className="flex items-center space-x-1 ">
          <ClipboardDocumentListIcon className="w-6" />
          <div>Items</div>
        </div>
        {items.length !== 0 ? <OrderPlaceModal /> : ""}
      </div>
      {items.length !== 0 ? (
        <div className="flex flex-row-reverse p-2 text-lg">
          Total: ₹{cartPrice}
        </div>
      ) : (
        ""
      )}
      <div className="pt-2">
        {items.length !== 0 ? (
          items.map((item) => <CheckoutItem key={item.itemID} item={item} />)
        ) : (
          <div className="flex justify-center pt-28">Empty cart</div>
        )}
      </div>
    </div>
  );
}
