//custom hooks
import { useState, useEffect } from "react";

const getLocalValue = (key, initialValue) => {
  //SSR next js (no window object in next js so we need to take care about that use this always in next js) (Server Side React)
  if (typeof window === "undefined") return initialValue;

  //if a value is already stored
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  //return result of a function
  //we may have "result" of a function stored in our local Storage
  if (initialValue instanceof Function) return initialValue();

  return initialValue;
};

const useLocalStorage = (key, initialValue) => {
  // const [value, setValue] = useState(
  //   JSON.parse(localStorage.getItem(key)) || initialValue
  // );
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initialValue);
  });
  //still work as same as before just expanded the functionality

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //if we only getting string data then this will work
  //but we are gonna expand this
  return [value, setValue];
};

export default useLocalStorage;
