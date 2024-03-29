import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RecoilContextProvider } from "./recoilContextProvider";
import { TransparentBackground } from "ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hungry Hub",
  description: "Mock food exploration app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-violet-50 ${inter.className}`}>
        <RecoilContextProvider>
          <TransparentBackground>{children}</TransparentBackground>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
