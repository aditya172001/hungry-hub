import { atom } from "recoil";

export const profileDropdownState = atom<boolean>({
  key: "profileDropdownState",
  default: false,
});

export const cityInSearchBarState = atom<boolean>({
  key: "cityInSearchBarState",
  default: false,
});
