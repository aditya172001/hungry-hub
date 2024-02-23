// "use client";
import { useState, type ReactElement } from "react";
import {
  ChevronDownIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/20/solid";
import { OrderType } from "types";

export function IndividualOrder({ order }: { order: OrderType }): ReactElement {
  const [isopen, setIsOpen] = useState(false);
  console.log(order);
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
              backgroundImage: `url(${order.restaurantProfilePicture})`,
            }}
          />
          <div>
            <div>
              <span className="font-light">Restaurant : </span>
              <span className="font-semibold">{order.restaurantName}</span>
            </div>
            <div>
              <span className="font-light">Items : </span>{" "}
              <span className="font-semibold">{order.items.length}</span>
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
          isopen ? "h-36" : "h-0"
        } overflow-hidden duration-300 ease-in-out`}
      >
        <div className="pl-14">
          <div>
            <span className="font-light">OrderStatus : </span>
            <span className="font-semibold">{order.orderStatus}</span>
          </div>
          <div>
            <span className="font-light">PaymentStatus : </span>
            <span className="font-semibold">{order.paymentStatus}</span>
          </div>
          <div>
            <span className="font-light">Delivery Address : </span>
            <span className="font-semibold">{`${order.deliveryAddress.street}, ${order.deliveryAddress.city}`}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClipboardDocumentListIcon className="h-4" />
            <div className="font-semibold">Items :-</div>
          </div>
          <div className="flex space-x-5">
            {order.items.map((it, index) => (
              <div key={index} className=" text-sm font-light text-violet-600">
                {it.item.itemName}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
