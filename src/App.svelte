<script>
  import { onMount } from 'svelte';
  import Header from "./lib/Header.svelte";
  import Search from "./lib/Search.svelte";
  import MovieDetail from "./lib/MovieDetail.svelte";
  import { route, getParam } from './lib/stores.mjs';
  import Watchlist from './lib/Watchlist.svelte';
  import Carousel from './lib/Carousel.svelte';

  let currentRoute;
  let imdbId = '';
  let movie = null;

  export async function getMovieDetail() {
    let url = `https://www.omdbapi.com/?apikey=3ca7a7ca&i=${imdbId}`
    let data = await fetch(url);
    let response = await data.json();
    movie = response;
  }

  route.subscribe(value => {
    currentRoute = value;
    if (currentRoute.startsWith('#movie-detail')) {
      imdbId = getParam('imdb');
      if (imdbId) {
        getMovieDetail()
      }
    }
  });

  window.addEventListener("popstate", () => {
    route.set(window.location.hash);
  });

  onMount(() => {
    route.set(window.location.hash);
  });
  import { onMount } from "svelte";
  import Login from "./lib/Login.svelte";
  import { userStore, route } from "./lib/stores.mjs";
  import { checkLogin } from "./lib/auth.mjs";
  import Navbar from "./lib/Navbar.svelte";
  import UserProfile from "./lib/UserProfile.svelte";

  async function init() {
    await checkLogin();
  }

  window.addEventListener("popstate", () => {
    if (document.location.hash == "#profile" && !$userStore.isLoggedIn) {
      console.log($userStore);
      document.location.hash = "#login";
    } else $route = document.location.hash;
  });

  onMount(init);
</script>


<Header/>
  <Navbar/>

<main>
  {#if $route.startsWith('#movie-detail')}
    {#if movie !== null}
      <MovieDetail {movie}/>
    {:else}
      <p>Loading movie details...</p>
    {/if}
  {:else if $route === '#search'}
    <Search/>
  {:else if $route === '#watchlist'} 
    <Watchlist/> 
  {:else}
    <Carousel/>
    <div class="purpose-box">
      <div class="mission">
        <h2>Our Mission</h2>
        <p>Our mission is to bring you the movies you are looking for. Oftentimes, many people will spend hours scrolling through movies and not being able to decide which movies to sit down and watch. Our interactive website allows you to search for movies and get a brief description that can help you choose a movie.</p>
        </div>
        <div class="story">
          <h2>Our Story</h2>
          <p>We are college students, tired of not being able to find movies to watch because of too many options. Together, we created Flick Favs as a way to find movie information and save interesting movies to watchlists. We also implemented a way for users to comment about movies they like or dislike for the benefit of others.</p>
        </div>
    </div>
    <a href="#search"><button>Create Your Movie Watchlist!</button></a>
  {/if}
  <div class="card">
    {#if $route === "#login"}
      <Login />
    {:else if $route === "#profile"}
      <UserProfile />
    {:else}
      <p>Home</p>
    {/if}
  </div>
</main>

<style>

</style>

