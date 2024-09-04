import secureLocalStorage from "react-secure-storage";

function isJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
export const setItemToStorage = (key, value) => {
  secureLocalStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromStorage = (key) => {
  const val = secureLocalStorage.getItem(key);
  return isJson(val) ? JSON.parse(val) : "";
};

export const removeItemFromStorage = (key) => {
  return secureLocalStorage.removeItem(key);
};

export const clearStorage = () => {
  secureLocalStorage.clear();
};
