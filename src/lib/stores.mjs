import { writable } from "svelte/store";
export const userStore = writable({ isLoggedIn: false, user: null });
export const route = writable("#home");