import { useState, useEffect } from "react";

export default function useLocalStorage<T>(
  localStorageKey: string
): [T, (value: string) => void] {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ""
  );

  useEffect(() => {
    if (localStorageKey && value) {
      localStorage.setItem(localStorageKey, value);
    }
  }, [localStorageKey, value]);

  return [value ? JSON.parse(value) : [], setValue];
}
