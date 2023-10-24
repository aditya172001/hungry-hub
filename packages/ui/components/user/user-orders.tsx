// "use client";
import axios from "axios";
import { ReactElement } from "react";
import { IndividualOrder } from "./individual-order";
import { OrderType } from "types";
import useSWR from "swr";

function fetcher() {
  return axios.get("/api/user/orders").then((res) => res.data.orders);
}

export function UserOrders(): ReactElement {
  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<OrderType[]>("api/user/orders", fetcher);

  return (
    <div className="">
      {orders ? (
        <div className="py-2">
          {orders.map((order, index) => {
            return <IndividualOrder key={index} order={order} />;
          })}
        </div>
      ) : null}
    </div>
  );
}
