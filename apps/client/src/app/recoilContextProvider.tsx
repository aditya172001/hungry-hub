"use client";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

export function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
}
