// utils/localStorage.js

// Set an item in localStorage
export const setLocalStorageItem = (key, value) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

// Get an item from localStorage
export const getLocalStorageItem = (key) => {
  if (typeof window !== 'undefined') {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
};

// Remove an item from localStorage
export const removeLocalStorageItem = (key) => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);
  }
};
