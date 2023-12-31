"use client";
import axios from "axios";
import { ReactElement } from "react";
import useSWR from "swr";
import { addressType } from "validation";
import Image from "next/image";

function fetcher() {
  return axios.get("/api/user").then((response) => response.data.user.address);
}

export function UserAddress({ spinner }: { spinner: string }): ReactElement {
  const {
    data: address,
    error,
    isLoading,
  } = useSWR<addressType>("/api/user", fetcher);
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
      {address ? (
        <div className="py-2">
          <div className="py-1">
            <div className="text-sm text-gray-600 font-light">Country</div>
            <div className=" font-semibold">{address.country}</div>
          </div>
          <div className="py-1">
            <div className="text-sm text-gray-600 font-light">State</div>
            <div className=" font-semibold">{address.state}</div>
          </div>
          <div className="py-1">
            <div className="text-sm text-gray-600 font-light">City</div>
            <div className=" font-semibold">{address.city}</div>
          </div>
          <div className="py-1">
            <div className="text-sm text-gray-600 font-light">Street</div>
            <div className=" font-semibold">{address.street}</div>
          </div>
          <div className="py-1">
            <div className="text-sm text-gray-600 font-light">Postal Code</div>
            <div className=" font-semibold">{address.postalCode}</div>
          </div>
        </div>
      ) : (
        <div className="flex h-96 items-center justify-center">
          Address not available, Please update the profile
        </div>
      )}
    </div>
  );
}
