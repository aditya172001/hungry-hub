"use client";
import { useState, type ReactElement, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  allCitiesState,
  cityInSearchBarState,
  cityState,
  initiateSearchState,
  searchState,
} from "store";
import { useRouter } from "next/navigation";
import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import axios from "axios";

export function SearchBar(): ReactElement {
  const router = useRouter();
  const [city, setCity] = useRecoilState(cityState);
  const [search, setSearch] = useRecoilState(searchState);
  const [initiateSearch, setInitiateSearch] =
    useRecoilState(initiateSearchState);
  const [allCities, setAllCities] = useRecoilState(allCitiesState);
  const [isCityLoading, setIsCityLoading] = useState(false);

  const [isCitySelected, setIsCitySelected] =
    useRecoilState(cityInSearchBarState);

  useEffect(() => {
    async function getCities() {
      try {
        setIsCityLoading(true);
        const response = await axios.get("api/city");
        setAllCities(response.data.cities);
      } catch (error: any) {
        if (error.response.data.message) {
          console.error(error.response.data.message);
        } else {
          console.error(error);
        }
      } finally {
        setIsCityLoading(false);
      }
    }
    getCities();
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    setInitiateSearch(false);
    if (e.key === "Enter") {
      setInitiateSearch(true);
      router.push("/search-restaurants");
    }
  }

  function handleSelectCity(filteredCity: string) {
    setCity(filteredCity);
    if (initiateSearch === true) setInitiateSearch(false);
    setTimeout(() => {
      setInitiateSearch(true);
    }, 1);
    router.push("/search-restaurants");
  }

  return (
    <div className="flex relative mx-4">
      <div className="absolute bg-white z-0 w-full rounded-lg h-8 sm:h-12" />
      <div className="z-10">
        <div
          className="flex items-center text-black rounded-lg py-1 pl-2 sm:pl-5  bg-white"
          onClick={() => {
            //to make sure is doesnt get disabled by layout disable drodown
            setTimeout(() => {
              setIsCitySelected(true);
            }, 1);
          }}
        >
          <MapPinIcon
            className="hidden sm:block w-5 text-gray-500"
            stroke="currentColor"
            strokeWidth={1.5}
            fill="none"
          />
          <input
            value={city}
            className="p-1 sm:p-2 h-6 sm:h-10 w-24 sm:w-36 focus:outline-none"
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="text-gray-400">|</div>
        </div>
        <div
          className={`bg-white border absolute rounded-md mx-1 mt-1 transition-all ease-in-out duration-200 ${
            isCitySelected
              ? " opacity-100 border-violet-200"
              : " opacity-0 overflow-hidden border-transparent"
          }`}
        >
          {isCityLoading && (
            <div className="px-4 py-1 w-28 sm:w-44 rounded-md text-black h-fit">
              Loading...
            </div>
          )}

          {!isCityLoading && allCities.length === 0 && (
            <div className="px-4 py-1 w-28 sm:w-44 rounded-md text-black h-fit">
              Not available
            </div>
          )}

          {!isCityLoading && allCities.length > 0 && (
            <div>
              {allCities
                .filter((singleCity) =>
                  singleCity.toLowerCase().startsWith(city.toLowerCase())
                )
                .slice(0, 6)
                .map((filteredCity, index) => (
                  <div
                    key={index}
                    className="px-4 py-1 w-44 rounded-md text-black h-fit hover:bg-violet-200 hover:cursor-pointer"
                    onClick={() => handleSelectCity(filteredCity)}
                  >
                    {filteredCity}
                  </div>
                ))}
              {allCities.filter((singleCity) =>
                singleCity.toLowerCase().startsWith(city.toLowerCase())
              ).length === 0 && (
                <div className="px-4 py-1 w-44 rounded-md text-black h-fit">
                  No matching city
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="z-10 flex text-black rounded-lg py-1 px-2 sm:px-5 bg-white">
        <MagnifyingGlassIcon className="hidden sm:block w-5 bg-white" />
        <input
          value={search}
          className="p-1 sm:p-2 h-6 sm:h-10 w-60 sm:w-96 rounded-r-md focus:outline-none"
          placeholder="Search for a restaurant, cuisine or dish"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
