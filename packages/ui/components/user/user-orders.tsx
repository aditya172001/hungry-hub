// "use client";
import axios from "axios";
import { ReactElement } from "react";
import { IndividualOrder } from "./individual-order";
import { OrderType } from "types";
import useSWR from "swr";
import Image from "next/image";

function fetcher() {
  return axios.get("/api/user/orders").then((res) => res.data.orders);
}

export function UserOrders({ spinner }: { spinner: string }): ReactElement {
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<OrderType[]>("api/user/orders", fetcher);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Image
          src={spinner}
          height={100}
          width={100}
          alt="spinner"
          className=" w-16"
        />
      </div>
    );
  }

  return (
    <div className="">
      {orders ? (
        <div className="py-2">
          {orders
            .sort((a, b) => (a.orderDateTime > b.orderDateTime ? -1 : 1))
            .map((order, index) => {
              return <IndividualOrder key={index} order={order} />;
            })}
        </div>
      ) : (
        <div className="flex h-96 items-center justify-center">
          No order history available, Order some food.
        </div>
      )}
    </div>
  );
}
