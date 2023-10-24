"use client";

import { useState, type ReactElement } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export function MyAccordian({
  title,
  contents,
}: {
  title: string;
  contents: string[];
}): ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-white p-4 rounded-md border border-violet-200"
      onClick={() => setOpen((open) => !open)}
    >
      <div className="flex items-center justify-between">
        <div>{title}</div>
        <ChevronDownIcon
          className={`w-5 text-purple-400 duration-300 ease-in-out ${
            open ? " rotate-180" : " rotate-0"
          }`}
        />
      </div>
      <div
        className={`duration-300 ease-in-out overflow-hidden ${
          open ? "h-6" : "h-0"
        }`}
      >
        {contents.map((content, index) => (
          <span key={index} className=" text-gray-700 text-sm pr-8">
            {content}
          </span>
        ))}
      </div>
    </div>
  );
}
