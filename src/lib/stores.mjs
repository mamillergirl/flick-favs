import { writable } from 'svelte/store';

export const route = writable('#home');

export const userStore = writable({ isLoggedIn: false, user: null });
// Function to get query parameter value from URL hash
export function getParam(paramName) {
  const queryString = window.location.hash.substring(14);
 
  const urlParams = new URLSearchParams(queryString);

  // Check if the query parameter exists in the URL hash
  for (let [key, value] of urlParams) {
    console.log(key)
    if (key === paramName) {
      return value;
    }
  }

  return null; // Return null if the parameter is not found
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));

}
