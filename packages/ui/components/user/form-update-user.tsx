"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      //redirect to error page
    }
  }

  //set the updated data
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
