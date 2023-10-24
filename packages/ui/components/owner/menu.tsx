import { itemPostType } from "validation";
import { IndividualMenuItem } from "./individual-menu-item";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export function Menu({
  menu,
  restaurantID,
}: {
  menu: itemPostType[];
  restaurantID: string;
}) {
  return (
    <div>
      <div className="flex flex-row-reverse mt-4 mb-2">
        <Link
          href={`/restaurants/${restaurantID}/add-item`}
          className=" bg-violet-500 text-white rounded-md p-2 flex items-center"
        >
          <PlusIcon className="text-white w-5" />
          <div>Add new item</div>
        </Link>
      </div>

      {menu && menu.length !== 0 ? (
        menu.map((item, index) => {
          return (
            <IndividualMenuItem
              key={index}
              item={JSON.stringify(item)}
              restaurantID={restaurantID}
            />
          );
        })
      ) : (
        <div>No items found</div>
      )}
    </div>
  );
}
