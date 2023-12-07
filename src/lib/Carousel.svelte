<script>
  import { onMount } from "svelte";
  import MovieCard from "./MovieCard.svelte";

  let currentIndex = 0;
  let movies = []; // Array to hold the fetched movie data
  const apiKey = "3ca7a7ca"; // We should also think of having a secrets file for our api code.

  onMount(async () => {
    await fetchLatestMovies();
  });

  //   Only fetch the latest movies, so far only determined by year and movie
  async function fetchLatestMovies() {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=2023&type=movie`; // Corrected URL
    const response = await fetch(url);
    const data = await response.json();
    movies = data.Search?.filter((movie) => movie.Type === "movie") || [];
  }

  const showNext = () => {
    currentIndex = (currentIndex + 1) % movies.length;
  };

  const showPrevious = () => {
    currentIndex = (currentIndex - 1 + movies.length) % movies.length;
  };

  // Function to get an array of the current movies to display
  $: currentMovies =
    movies.length > 0
      ? [
          movies[currentIndex % movies.length], // Ensure we don't go out of bounds
          movies[(currentIndex + 1) % movies.length], // Again, Ensure we don't go out of bounds
          movies[(currentIndex + 2) % movies.length], // Again, Ensure we don't go out of bounds
        ].filter(Boolean) // Get rid of any undefined entries
      : [];
</script>

<h1>New Releases</h1>
<div class="carousel-container">
  <button on:click={showPrevious} class="prev">&#10094;</button>
  {#if movies.length > 0}
    {#each currentMovies as movie, index (movie.imdbID)}
      <MovieCard {movie} />
    {/each}
  {:else}
    <p>Loading movies...</p>
  {/if}
  <button on:click={showNext} class="next">&#10095;</button>
</div>

<style>
  .carousel-container {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 16px 0;
    border: white 3px solid;
    border-radius: 10px;
  }

  .carousel-container > * {
    flex: 0 0 auto;
  }

  .carousel-slide img {
    width: 100%;
    display: block;
  }
  .prev,
  .next {
    cursor: pointer;
    width: auto;
    padding: 16px;
    margin: 200px 0px 200px 0px;
    background-color: #232234;
    color: white;
    font-weight: bold;
    font-size: 30px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
  }
  .next {
    right: 30%;
    border-radius: 0 3px 3px 0;
  }
  .prev {
    left: 30%;
    border-radius: 3px 0 0 3px;
  }
  .prev:hover,
  .next:hover {
    background-color: #FF5858;
  }
</style>
