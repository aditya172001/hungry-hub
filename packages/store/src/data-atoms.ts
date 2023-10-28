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

export const cartPriceState = selector({
  key: "cartPriceState",
  get: ({ get }) => {
    const cartData = get(cartDataState);
    if (
      !cartData.items ||
      !cartData.restaurantID ||
      cartData.items.length === 0
    )
      return 0;
    const items = cartData.items;
    const price = items.reduce((sum, item) => sum + item.price, 0);
    return price;
  },
});
