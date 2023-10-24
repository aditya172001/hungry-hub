import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer(): ReactElement {
  return (
    <div className="bg-purple-200 px-48 py-8">
      <div className="text-3xl font-bold font-serif">hungryHub</div>
      <div className="flex justify-between text-sm">
        <div className="pt-3 text-sm text-gray-700">
          <p>
            HungryHub, developed by{" "}
            <span className="text-gray-800">
              <em>Aditya Kumar</em>
            </span>
            , is a web application that demonstrates a deep understanding of web
            development, user experience design, and innovation.
          </p>
          <p className="py-2">
            As a full-stack developer, I've created this project to showcase my
            skills in creating engaging and interactive web solutions.
          </p>
          <p>
            For potential recruiters and collaboration opportunities, please
            don't hesitate to contact me at{" "}
            <a
              href="mailto:adityakumar172001@gmail.com"
              className="text-black font-semibold"
            >
              adityakumar172001@gmail.com
            </a>
            . I'm excited to discuss how my expertise can benefit your
            organization and to explore exciting opportunities in the field of
            web development.
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
