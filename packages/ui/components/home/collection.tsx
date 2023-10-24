import type { ReactElement } from "react";
import Link from "next/link";

export function Collection({
  collection,
  image,
  textStyle,
}: {
  collection: string;
  image: string;
  textStyle: string;
}): ReactElement {
  return (
    <Link
      href={"/coming-soon"}
      className="bg-cover bg-center text-white h-40 w-72 my-5 rounded-md flex items-end p-2"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div>
        <div className={textStyle}>{collection}</div>
        <div className={`flex text-sm ${textStyle}`}>
          <div className="pr-1">X Places</div>
          <svg
            className="w-3 h-6 pb-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
