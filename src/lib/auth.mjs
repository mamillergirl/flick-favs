import { userStore } from "./stores.mjs";
import { supabase } from "./supabaseClient.mjs";

export async function signUp(user) {
  let { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password
  });

  return { data, error };
}

export async function login(user) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password
  });
  // track the user in the system
  if (data) userStore.set({ isLoggedIn: true, user: data.user });

  return { data, error };
}

export async function checkLogin() {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  console.log(session);
  if (session) {
    userStore.set({ isLoggedIn: true, user: session.user });
  } else {
    userStore.set({ isLoggedIn: false, user: null });
  }
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (!error) userStore.set({ isLoggedIn: false, user: null });
}