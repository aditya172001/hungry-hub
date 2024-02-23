import { useEffect, useState } from "react";

function getSavedValue<T>(key: string, initialValue: T): T {
  if (typeof window !== "undefined") {
    const savedValue = JSON.parse(localStorage.getItem(key) || "null") as T;
    if (savedValue !== null) {
      return savedValue;
    }
  }
  return initialValue;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, setValue]);

  return [value, setValue];
}
