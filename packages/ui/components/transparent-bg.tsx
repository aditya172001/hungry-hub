"use client";

import { ReactElement, ReactNode } from "react";
import { useRecoilState } from "recoil";
import { cityInSearchBarState, profileDropdownState } from "store";

export function TransparentBackground({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useRecoilState(profileDropdownState);
  const [isCitySelected, setIsCitySelected] =
    useRecoilState(cityInSearchBarState);

  function handleTransparentBgClick() {
    if (isProfileDropdownOpen) setIsProfileDropdownOpen(false);
    if (isCitySelected) setIsCitySelected(false);
  }
  return (
    <div
      className="absolute inset-0 h-full w-full"
      onClick={handleTransparentBgClick}
    >
      {children}
    </div>
  );
}
