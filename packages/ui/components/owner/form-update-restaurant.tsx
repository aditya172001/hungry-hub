"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch } from "@headlessui/react";
import { useParams } from "next/navigation";
import { RestaurantInfoType } from "types";

export function FormUpdateRestaurant({
  erroricon,
}: {
  erroricon: string;
}): ReactElement {
  const { restaurantID } = useParams();

  const router = useRouter();

  //form data states
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [dining, setDining] = useState(false);
  const [nightlife, setNightlife] = useState(false);

  const [myerror, setMyerror] = useState("");

  async function fetchRestaurantData() {
    try {
      //fetch the data and hydrate form
      const response = await axios.get(
        `/api/owner/restaurants/${restaurantID}`
      );
      const restaurant = response.data.myRestaurant as RestaurantInfoType;
      setRestaurantName(restaurant.restaurantName);
      setDescription(restaurant.description);
      setProfilePicture(restaurant.profilePicture);
      setCountry(restaurant.address.country);
      setState(restaurant.address.state);
      setCity(restaurant.address.city);
      setStreet(restaurant.address.street);
      setPostalCode(restaurant.address.postalCode);
      setOpeningTime(restaurant.openingHours.open);
      setClosingTime(restaurant.openingHours.close);
      setDining(restaurant.dining);
      setNightlife(restaurant.nightlife);
    } catch (error) {
      console.error(error);
      //redirect to error page
    }
  }

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/owner/restaurants/${restaurantID}`,
        {
          restaurantName,
          description,
          profilePicture,
          address: { country, state, city, street, postalCode },
          openingHours: { open: openingTime, close: closingTime },
          dining,
          nightlife,
        }
      );
      toast.success(`${response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setTimeout(() => {
        router.back();
        router.refresh();
      }, 3000);
    } catch (error: any) {
      console.error(error);
      if (error?.response?.data !== undefined) {
        setMyerror(error.response.data.message);
      } else if (error.message == "Network Error") {
        setMyerror(error.message);
      } else {
        setMyerror("Internal Server error");
      }
      fetchRestaurantData();
    }
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    router.back();
  }

  return (
    <form className="flex flex-col items-start" onSubmit={handleSubmit}>
      <ToastContainer />
      <label className="text-sm py-1">Restaurant Name</label>
      <input
        value={restaurantName}
        type="text"
        onChange={(e) => {
          setMyerror("");
          setRestaurantName(e.target.value);
        }}
        className="border w-full rounded-md h-9 mb-5 pl-3 outline-violet-400"
      />
      <label className="text-sm py-1">Description</label>
      <input
        value={description}
        type="text"
        onChange={(e) => {
          setMyerror("");
          setDescription(e.target.value);
        }}
        className="border w-full rounded-md h-9 mb-5 pl-3 outline-violet-400"
      />
      <label className="text-sm py-1">Profile Picture URL</label>
      <input
        value={profilePicture}
        type="text"
        onChange={(e) => {
          setMyerror("");
          setProfilePicture(e.target.value);
        }}
        className="border w-full rounded-md h-9 mb-5 pl-3 outline-violet-400"
      />
      <div className="text-sm py-1">Address</div>
      <div className="flex">
        <div>
          <label className="text-sm py-1 font-light">Country</label>
          <input
            value={country}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setCountry(e.target.value);
            }}
            className="border w-half rounded-md h-9 mb-1 mr-1 pl-3 outline-violet-400"
          />
        </div>
        <div>
          <label className="text-sm py-1 font-light">State</label>
          <input
            value={state}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setState(e.target.value);
            }}
            className="border w-half rounded-md h-9 mb-1 ml-1 pl-3 outline-violet-400"
          />
        </div>
      </div>
      <div className="flex">
        <div>
          <label className="text-sm py-1 font-light">City</label>
          <input
            value={city}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setCity(e.target.value);
            }}
            className="border w-half rounded-md h-9 mb-1 mr-1 pl-3 outline-violet-400"
          />
        </div>
        <div>
          <label className="text-sm py-1 font-light">Street</label>
          <input
            value={street}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setStreet(e.target.value);
            }}
            className="border w-half rounded-md h-9 mb-1 ml-1 pl-3 outline-violet-400"
          />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex flex-col">
          <label className="text-sm py-1 font-light align w-half">
            Postal Code
          </label>
          <input
            value={postalCode}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setPostalCode(e.target.value);
            }}
            className="border w-half rounded-md h-9 mb-1 pl-3 outline-violet-400"
          />
        </div>
      </div>
      <div className="text-sm py-1">Timing</div>
      <div className="flex">
        <div>
          <label className="text-sm py-1 font-light">Opening Time</label>
          <input
            value={openingTime}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setOpeningTime(e.target.value);
            }}
            className="border w-half rounded-md h-9 mb-1 mr-1 pl-3 outline-violet-400"
          />
        </div>
        <div>
          <label className="text-sm py-1 font-light">Closing Time</label>
          <input
            value={closingTime}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setClosingTime(e.target.value);
            }}
            className="border w-half rounded-md h-9 mb-1 ml-1 pl-3 outline-violet-400"
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center pt-1">
          <label className="text-sm py-1 pr-2">Dining</label>
          <Switch
            checked={dining}
            onChange={setDining}
            className={`${dining ? "bg-violet-500" : "bg-violet-500"}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 mr-24`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${dining ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
        <div className="flex items-center">
          <label className="text-sm py-1 px-2">Night Life</label>
          <Switch
            checked={nightlife}
            onChange={setNightlife}
            className={`${nightlife ? "bg-violet-500" : "bg-violet-500"}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${nightlife ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>

      {myerror ? (
        <div className="flex items-center">
          <Image src={erroricon} width={14} height={14} alt="error icon" />
          <span className="text-sm text-red-500 pl-1">{myerror}</span>
        </div>
      ) : (
        <span className="text-sm">&nbsp;</span>
      )}

      <div className="flex w-full">
        <button
          type="button"
          onClick={handleCancel}
          className="border w-full rounded-md h-11 border-violet-500 bg-white text-violet-500 my-5 mr-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="border w-full rounded-md h-11 bg-violet-500 text-white my-5 ml-1"
        >
          Update
        </button>
      </div>
    </form>
  );
}
