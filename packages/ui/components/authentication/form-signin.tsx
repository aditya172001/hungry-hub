"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

export function FormSignin({
  googleicon,
  erroricon,
}: {
  googleicon: string;
  erroricon: string;
}): React.ReactNode {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [myerror, setMyerror] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });
      if (!res?.error) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setEmail("");
        setPassword("");
        setMyerror("Invalid credentials");
      }
    } catch (error: any) {
      console.error(error);
      if (error?.response?.data !== undefined) {
        setMyerror(error.response.data.message);
      } else if (error.message == "Network Error") {
        setMyerror(error.message);
      } else {
        setMyerror("Internal Server error");
      }

      setEmail("");
      setPassword("");
    }
  }

  async function handleSignin(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      signIn("google", { callbackUrl });
    } catch (error) {
      setMyerror("oAuth error");
      console.error(error);
    }
  }

  return (
    <div className="">
      <form className="flex flex-col items-start" onSubmit={handleSubmit}>
        <label className="text-sm py-1">Email</label>
        <input
          required
          value={email}
          type="text"
          onChange={(e) => {
            setMyerror("");
            setEmail(e.target.value);
          }}
          className="border w-full rounded-md h-9 mb-5 pl-3 outline-violet-400"
        />
        <label className="text-sm py-1">Password</label>
        <input
          required
          value={password}
          type="password"
          onChange={(e) => {
            setMyerror("");
            setPassword(e.target.value);
          }}
          className="border w-full rounded-md h-9 mb-1 pl-3 outline-violet-400"
        />
        {myerror ? (
          <div className="flex items-center">
            <Image src={erroricon} width={14} height={14} alt="error icon" />
            <span className="text-sm text-red-500 pl-1">{myerror}</span>
          </div>
        ) : (
          <span className="text-sm">&nbsp;</span>
        )}
        <button
          type="submit"
          className="border w-full rounded-md h-11 bg-violet-500 text-white my-5"
        >
          Signin
        </button>
      </form>
      <div className="flex items-center pb-5">
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="mx-4 text-gray-500">or</div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <button
        className="border w-full rounded-md h-11 bg-white mb-5 flex items-center justify-center"
        onClick={handleSignin}
      >
        <Image src={googleicon} width={20} height={20} alt="goole-icon" />
        <div className="pl-2">Sign in with google</div>
      </button>
      <div className="flex justify-center text-sm">
        Don't have an account?{" "}
        <a
          className="text-violet-500 ml-1 hover:cursor-pointer"
          onClick={() => {
            router.push("/signup");
          }}
        >
          Signup
        </a>
      </div>
    </div>
  );
}
