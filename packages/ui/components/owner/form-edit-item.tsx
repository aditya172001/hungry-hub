"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch } from "@headlessui/react";
import { courseType, cuisineType } from "validation";

export function FormEditItem({
  erroricon,
}: {
  erroricon: string;
}): ReactElement {
  const { restaurantID } = useParams();

  const router = useRouter();
  const searchParams = useSearchParams();
  const itemID = searchParams.get("itemID");

  //form data states
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState("");
  const [cuisine, setCuisine] = useState<cuisineType>();
  const [course, setCourse] = useState<courseType>();
  const [veg, setVeg] = useState(true);

  const [myerror, setMyerror] = useState("");

  async function fetchItemData() {
    try {
      //fetch the data and hydrate form
      const response = await axios.get(`/api/owner/restaurants/menu`, {
        headers: { itemID },
      });
      const item = response.data.myItem;
      setItemName(item.itemName);
      setDescription(item.description);
      setImageURL(item.imageURL);
      setPrice(item.price);
      setCuisine(item.cuisine);
      setCourse(item.course);
      setVeg(item.veg);
    } catch (error) {
      console.error(error);
      //redirect to error page
    }
  }

  useEffect(() => {
    fetchItemData();
  }, []);

  const cuisineOptions = [
    "Indian",
    "Italian",
    "French",
    "Chinese",
    "Japanese",
    "Thai",
    "Mexican",
    "Other",
  ];

  const CourseOptions = ["Appetizer", "Main course", "Dessert", "Drinks"];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/owner/restaurants/menu`, {
        itemID,
        restaurantID,
        itemName,
        description,
        imageURL,
        price: Number(price),
        cuisine,
        course,
        veg,
      });
      toast.success(`${response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setTimeout(() => {
        router.push(`/restaurants/${restaurantID}`);
      }, 1800);
    } catch (error: any) {
      console.error(error);
      if (error?.response?.data !== undefined) {
        setMyerror(error.response.data.message);
      } else if (error.message == "Network Error") {
        setMyerror(error.message);
      } else {
        setMyerror("Internal Server error");
      }
      // fetchRestaurantData();
    }
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    router.back();
  }

  return (
    <form className="flex flex-col items-start" onSubmit={handleSubmit}>
      <ToastContainer />
      <label className="text-sm py-1">Item Name</label>
      <input
        value={itemName}
        type="text"
        onChange={(e) => {
          setMyerror("");
          setItemName(e.target.value);
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
      <label className="text-sm py-1">Image URL</label>
      <input
        value={imageURL}
        type="text"
        onChange={(e) => {
          setMyerror("");
          setImageURL(e.target.value);
        }}
        className="border w-full rounded-md h-9 mb-5 pl-3 outline-violet-400"
      />
      <label className="text-sm py-1">Price</label>
      <input
        value={price}
        type="text"
        onChange={(e) => {
          setMyerror("");
          setPrice(e.target.value);
        }}
        className="border w-full rounded-md h-9 mb-5 pl-3 outline-violet-400"
      />
      <div className="flex">
        <div>
          <label className="text-sm py-1 pr-2">Cuisine</label>
          <select
            value={cuisine as string}
            onChange={(e) => setCuisine(e.target.value as cuisineType)}
            className="border rounded-md outline-violet-400 mr-10"
          >
            {cuisineOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm py-1 px-2">Course</label>
          <select
            value={course as string}
            onChange={(e) => setCourse(e.target.value as courseType)}
            className="border rounded-md outline-violet-400"
          >
            {CourseOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center pt-1">
          <label className="text-sm py-1 pr-2">Veg</label>
          <Switch
            checked={veg}
            onChange={setVeg}
            className={`${veg ? "bg-green-500" : "bg-red-500"}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 mr-24`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${veg ? "translate-x-6" : "translate-x-0"}
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
