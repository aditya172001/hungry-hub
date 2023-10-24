"use client";

import { ReactElement } from "react";
import { useRouter } from "next/navigation";

export function SigninAndSignupButton(): ReactElement {
  const router = useRouter();

  return (
    <div>
      <button
        className="pr-10 focus:outline-none"
        type="button"
        onClick={() => router.push("/signin")}
      >
        Signin
      </button>
      <button
        className="pr-10 focus:outline-none"
        type="button"
        onClick={() => router.push("/signup")}
      >
        Singup
      </button>
    </div>
  );
}
