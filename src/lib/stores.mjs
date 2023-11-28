import { writable } from 'svelte/store';

export const route = writable('#home');


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
