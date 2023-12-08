import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer(): ReactElement {
  return (
    <div className="bg-purple-200 px-48 py-8">
      <div className="text-3xl font-bold font-serif">hungryHub</div>
      <div className="flex justify-between text-sm">
        <div className="pt-3 text-sm text-gray-700">
          <p>© 2023 Aditya Kumar</p>
          <p className="py-2">
            Disclaimer: This website is a demonstration and mock-up, created for
            portfolio and educational purposes only. The content, services, and
            features presented here are simulated and do not represent
            real-world functionality. Any resemblance to actual products,
            services, or entities is purely coincidental. This website does not
            offer genuine services, and no transactions or interactions on this
            site have real-world consequences. For inquiries, please contact{" "}
            <a
              href="mailto:adityakumar172001@gmail.com"
              className="text-black font-semibold"
            >
              adityakumar172001@gmail.com
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col items-start  py-1 min-w-fit pl-10">
          <div className="py-1 font-semibold">MY SOCIAL LINKS</div>
          <div className="flex items-center justify-evenly w-full">
            <Link
              href="https://twitter.com/aditya172001"
              className="focus:outline-none"
            >
              <Image
                src="/twitter.svg"
                height={100}
                width={100}
                alt="twitter icon"
                className="w-5"
              />
            </Link>
            <Link
              href="https://github.com/aditya172001"
              className="focus:outline-none"
            >
              <Image
                src="/github.svg"
                height={100}
                width={100}
                alt="twitter icon"
                className="w-5"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/aditya-kumar-67b789214/"
              className="focus:outline-none"
            >
              <Image
                src="/linkedin.svg"
                height={100}
                width={100}
                alt="twitter icon"
                className="w-4"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
