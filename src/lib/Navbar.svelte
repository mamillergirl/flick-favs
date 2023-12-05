<script>
    import { userStore } from "./stores.mjs";
    import { logout } from "./auth.mjs";
  </script>
  
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      {#if $userStore.isLoggedIn}
        <li><a href="#profile">Profile</a></li>
        <li><a href="#home" on:click={logout}>Logout</a></li>
      {:else}
        <li><a href="#login">Login</a></li>
      {/if}
    </ul>
  </nav>
  
  <style>
    ul {
      display: flex;
      list-style-type: none;
      padding-left: 0;
      gap: 1em;
    }
  </style>