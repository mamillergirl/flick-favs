<script>
  import { login, signUp } from "./auth.mjs";
  let email = "";
  let password = "";
  let loading = false;
  let errorMessage = "";

  async function handleLogin() {
    try {
      loading = true;
      const { data, error } = await login({ email, password });
      if (error) throw error;
    } catch (err) {
      errorMessage = err;
    } finally {
      loading = false;
    }
  }
  async function handleSignup() {
    try {
      loading = true;
      const { data, error } = await signUp({ email, password });
      if (error) throw error;
    } catch (err) {
      errorMessage = err;
    } finally {
      loading = false;
    }
  }
</script>
<body>
<div class="form-container">
  <h1>Welcome to Flick Faves</h1>
  <form on:submit|preventDefault={handleLogin}>
    <div>
      <input
        id="email"
        class="inputField"
        type="email"
        placeholder="Your email"
        bind:value={email}
      />
    </div>
    <div>
      <input
        id="password"
        class="inputField"
        type="password"
        placeholder="Password"
        bind:value={password}
      />
    </div>
    {#if errorMessage}
      <p class="error-message">{errorMessage}</p>
    {/if}
    <div>
      <button
        type="submit"
        class="button block"
        aria-live="polite"
        disabled={loading}
      >
        <span>{loading ? "Logging In..." : "Login"}</span>
      </button>  <br><br>
      <button
        on:click={handleSignup}
        type="button"
        class="button block"
        aria-live="polite"
        disabled={loading}
      >
        <span>{"Sign Up"}</span>
      </button>
    </div>
  </form>
</div>
</body>
<style>
  body {
    color: #fff;
    font-family: 'Movies', sans-serif;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .form-container {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    width: 400px;
    text-align: center;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .inputField {
    width: 95%;
    padding: 12px;
    margin: 10px 0;
    border: none;
    border-bottom: 2px solid #fff;
    background-color: transparent;
    color: #fff;
    outline: none;
  }

  .inputField::placeholder {
    color: #aaa;
  }

  button {
    width: 85%;
    padding: 15px;
    background-color: #e50914;
    color: #fff;
    border: 5px white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  button:disabled {
    background-color: #666;
    cursor: not-allowed;
  }

  button:hover {
    background-color: #d30812;
  }

  .error-message {
    color: #ff3333;
    margin-top: 10px;
  }
</style>