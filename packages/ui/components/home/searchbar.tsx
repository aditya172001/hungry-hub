"use client";
import { type ReactElement } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cityState, initiateSearchState, searchState } from "store";
import { useRouter } from "next/navigation";
import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export function SearchBar(): ReactElement {
  const router = useRouter();
  const [city, setCity] = useRecoilState(cityState);
  const [search, setSearch] = useRecoilState(searchState);
  const setInitiateSearch = useSetRecoilState(initiateSearchState);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    setInitiateSearch(false);
    if (e.key === "Enter") {
      setInitiateSearch(true);
      router.push("/search-restaurants");
    }
  }

  return (
    <div className="flex text-black rounded-lg py-1 px-5 bg-white shadow">
      <MapPinIcon
        className="w-5 text-gray-500"
        stroke="currentColor"
        strokeWidth={1.5}
        fill="none"
      />
      <input
        value={city}
        className="p-2 h-10 w-36 focus:outline-none"
        placeholder="city"
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center pr-2">
        <div className="h-3/5 w-1 border-r border-gray-300"></div>
      </div>
      <MagnifyingGlassIcon className="w-5 bg-white text-gray-500" />
      <input
        value={search}
        className="p-2 h-10 w-96 rounded-r-md focus:outline-none"
        placeholder="Search for a restaurant, cuisine or dish"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
