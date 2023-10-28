"use client";

import { useRecoilValue } from "recoil";
import { cartDataState } from "store";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

export function CartButton() {
  const cart = useRecoilValue(cartDataState);

  return (
    <Link href={"/checkout"} className="relative px-2 py-1">
      <ShoppingCartIcon className="w-9 hover:cursor-pointer text-gray-700" />
      {cart.items.length ? (
        <div className="absolute inset-x-7 inset-y-0 bg-violet-500 w-5 h-5 rounded-full text-white text-sm flex justify-center">
          {cart.items.length}
        </div>
      ) : (
        ""
      )}
    </Link>
  );
}
