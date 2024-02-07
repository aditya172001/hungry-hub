"use client";

import { ReactElement } from "react";
import { useRouter } from "next/navigation";

export function SigninAndSignupButton(): ReactElement {
  const router = useRouter();

  return (
    <div className="flex">
      <button
        className="pr-3 sm:pr-5 focus:outline-none"
        type="button"
        onClick={() => router.push("/signin")}
      >
        Signin
      </button>
      <button
        className="focus:outline-none"
        type="button"
        onClick={() => router.push("/signup")}
      >
        Singup
      </button>
    </div>
  );
}
