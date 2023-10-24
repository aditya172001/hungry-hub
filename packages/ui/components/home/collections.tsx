import type { ReactElement } from "react";
import { Collection } from "./collection";

export function Collections(): ReactElement {
  return (
    <div className="flex flex-col px-48">
      <div className="text-2xl">Collections</div>
      <div className="flex justify-between space-x-5">
        <Collection
          collection="Veggie Friendly"
          image="/veggie-friendly.jpg"
          textStyle="text-white"
        />
        <Collection
          collection="Must Visit Restaurants"
          image="/must-visit-restaurants.jpg"
          textStyle="text-amber-800"
        />
        <Collection
          collection="Great Cafes"
          image="/great-cafes.jpg"
          textStyle="text-amber-800"
        />
        <Collection
          collection="Best Pizza Places in Town"
          image="/best-pizza-places.jpg"
          textStyle="text-white"
        />
      </div>
    </div>
  );
}
