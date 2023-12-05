<script>
    import { userStore } from "./stores.mjs";
    import { getUserProfile, setUserProfile } from "./supabaseClient.mjs";
    let profile = {};
    let message = "";
    const userId = $userStore.user.id;
    async function init() {
      profile = await getUserProfile(userId);
      console.log(profile);
    }
    async function handleSubmit(e) {
      e.preventDefault();
  
      const error = await setUserProfile(profile, userId);
      if (!error) {
        message = "Profile Updated";
      } else {
        console.log(error);
        message = error.message;
      }
    }
    init();
  </script>
  
  {#if message}
    <p>{message}</p>
  {/if}
  <h2>User Profile</h2>
  <form on:submit={handleSubmit}>
    <p>
      <label for="website">Website</label>
      <input
        type="text"
        id="website"
        name="website"
        bind:value={profile.website}
      />
    </p>
    <p>
      <label for="full_name">Full Name</label>
      <input
        type="text"
        id="full_name"
        name="full_name"
        bind:value={profile.full_name}
      />
    </p>
    <button type="submit">Submit</button>
  </form>