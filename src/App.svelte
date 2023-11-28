<script>
  import { onMount } from 'svelte';
  import Header from "./lib/Header.svelte";
  import Search from "./lib/Search.svelte";
  import MovieDetail from "./lib/MovieDetail.svelte";
  import { route, getParam } from './lib/stores.mjs';

  let currentRoute;
  let imdbId = '';
  let movie = null;

  async function getMovieDetail() {
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
        getMovieDetail().then(() => {
          // After fetching movie details, update the movie variable
          console.log(movie); // Ensure movie details are fetched
        });
      }
    }
  });

  window.addEventListener("popstate", () => {
    route.set(window.location.hash);
  });

  onMount(() => {
    route.set(window.location.hash);
  });
</script>

<Header/>

<main>
  {#if $route.startsWith('#movie-detail')}
    {#if movie !== null}
      <MovieDetail {movie}/>
    {:else}
      <p>Loading movie details...</p>
    {/if}
  {:else if $route === '#search'}
    <Search/>
  {:else}
    <h2>Welcome Home</h2>
  {/if}
</main>

<style>

</style>

