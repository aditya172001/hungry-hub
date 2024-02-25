import { atom, selector } from "recoil";
import { restaurantOptionType } from "validation";
import { CartDataType, UserRestaurantBodyType } from "../../types/src";

export const cityState = atom<string>({
  key: "cityState",
  default: "",
});

export const allCitiesState = atom<string[]>({
  key: "allCitiesState",
  default: [],
});

export const searchState = atom<string>({
  key: "searchState",
  default: "",
});

export const currentRestaurantOptionState = atom<restaurantOptionType>({
  key: "currentRestaurantOptionState",
  default: "order-online",
});

export const initiateSearchState = atom<boolean>({
  key: "initiateSearchState",
  default: false,
});

//to store all the restaurant data for a search field
export const userRestaurantBodyDataState = atom<
  UserRestaurantBodyType[] | undefined
>({ key: "userRestaurantBodyDataState", default: undefined });

//to store data of a single restaurant
export const cartDataState = atom<CartDataType>({
  key: "cartDataState",
  default: { items: [], restaurantID: "" },
});

export const isProgressBarVisibleState = atom<boolean>({
  key: "isProgressBarVisibleState",
  default: false,
});
