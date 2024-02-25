"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isProgressBarVisibleState } from "store";
import { useSetRecoilState } from "recoil";

export function FormUpdateUser({
  erroricon,
}: {
  erroricon: string;
}): ReactElement {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [myerror, setMyerror] = useState("");
  const setIsProgressBarVisible = useSetRecoilState(isProgressBarVisibleState);

  //func to fetch user data
  async function fetchUserData() {
    try {
      const response = await axios.get("/api/user");
      const user = response.data.user;
      setUserName(user.userName);
      setProfilePicture(user.profilePicture);
      setCountry(user.address?.country);
      setState(user.address?.state);
      setCity(user.address?.city);
      setStreet(user.address?.street);
      setPostalCode(user.address?.postalCode);
    } catch (error) {
      console.error(error);
    }
  }

  //set the updated data
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsProgressBarVisible(true);
    try {
      const response = await axios.put("/api/user", {
        userName,
        profilePicture,
        address: { country, state, city, street, postalCode },
      });
      toast.success(`${response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setTimeout(() => {
        router.push("/profile");
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
      fetchUserData();
    } finally {
      setIsProgressBarVisible(false);
    }
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    router.push("/profile");
  }

  return (
    <form className="flex flex-col items-start" onSubmit={handleSubmit}>
      <ToastContainer />
      <label className="text-sm py-1">User Name</label>
      <input
        value={userName}
        type="text"
        onChange={(e) => {
          setMyerror("");
          setUserName(e.target.value);
        }}
        className="border w-full rounded-md h-7 sm:h-9 mb-2 sm:mb-5 px-2 sm:px-3 outline-violet-400 text-sm sm:text-base"
      />
      <label className="text-sm py-1">Profile Picture URL</label>
      <input
        value={profilePicture}
        type="text"
        onChange={(e) => {
          setMyerror("");
          setProfilePicture(e.target.value);
        }}
        className="border w-full rounded-md h-7 sm:h-9 mb-2 sm:mb-5 px-2 sm:px-3 outline-violet-400 text-sm sm:text-base"
      />
      <div className="text-sm py-1">Address</div>
      <div className="grid grid-cols-2">
        <div className=" col-span-1">
          <label className="text-sm py-1 font-light">Country</label>
          <input
            value={country}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setCountry(e.target.value);
            }}
            className="border w-11/12 rounded-md h-7 sm:h-9 mb-1 mr-1 px-2 sm:px-3 outline-violet-400 text-sm sm:text-base"
          />
        </div>
        <div className=" col-span-1">
          <label className="ml-2 text-sm py-1 font-light">State</label>
          <input
            value={state}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setState(e.target.value);
            }}
            className=" border w-11/12 rounded-md h-7 sm:h-9 mb-1 ml-2 px-2 sm:px-3 outline-violet-400 text-sm sm:text-base"
          />
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className=" col-span-1">
          <label className="text-sm py-1 font-light mr-4">City</label>
          <input
            value={city}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setCity(e.target.value);
            }}
            className="border w-11/12 rounded-md h-7 sm:h-9 mb-1 mr-1 px-2 sm:px-3 outline-violet-400 text-sm sm:text-base"
          />
        </div>
        <div className=" col-span-1">
          <label className="ml-2 text-sm py-1 font-light">Street</label>
          <input
            value={street}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setStreet(e.target.value);
            }}
            className="border w-11/12 rounded-md h-7 sm:h-9 mb-1 ml-2 px-2 sm:px-3 outline-violet-400 text-sm sm:text-base"
          />
        </div>
      </div>
      <div className="flex justify-center w-60 sm:w-96">
        <div className="pl-8">
          <label className="text-sm py-1 font-light align w-1/2">
            Postal Code
          </label>
          <input
            value={postalCode}
            type="text"
            onChange={(e) => {
              setMyerror("");
              setPostalCode(e.target.value);
            }}
            className="border w-10/12 rounded-md h-7 sm:h-9 mb-1 px-2 sm:px-3 outline-violet-400 text-sm sm:text-base"
          />
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
          className="border w-full rounded-md h-8 sm:h-11 border-violet-500 bg-white text-violet-500 my-3 sm:my-5 mr-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="border w-full rounded-md h-8 sm:h-11 bg-violet-500 text-white my-3 sm:my-5 ml-1"
        >
          Update
        </button>
      </div>
    </form>
  );
}
