import useLocalStorage from "./useLocalStorage";
//we can use one hook inside another

const useInput = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const reset = () => setValue(initialValue);

  //these are the attributes we normally set in input
  const attributeObj = {
    value,
    onChange: (e) => setValue(e.target.value),
  };

  return [value, reset, attributeObj];
};

export default useInput;
