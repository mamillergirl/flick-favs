<script>
    import { onMount } from "svelte";
    import MovieCard from "./MovieCard.svelte";
  
    let currentIndex = 0;
    let movies = []; // Array to hold the fetched movie data
    const apiKey = import.meta.env.VITE_API_KEY;
  
    let genres = [
    { name: "Action", movies: [], currentIndex: 0 },
    { name: "Adventure", movies: [], currentIndex: 0 },
    { name: "Animation", movies: [], currentIndex: 0 },
    { name: "Biography", movies: [], currentIndex: 0 },
    { name: "Comedy", movies: [], currentIndex: 0 },
    { name: "Crime", movies: [], currentIndex: 0 },
    { name: "Documentary", movies: [], currentIndex: 0 },
    { name: "Drama", movies: [], currentIndex: 0 },
    { name: "Family", movies: [], currentIndex: 0 },
    { name: "Fantasy", movies: [], currentIndex: 0 },
    { name: "Film Noir", movies: [], currentIndex: 0 },
    { name: "History", movies: [], currentIndex: 0 },
    { name: "Horror", movies: [], currentIndex: 0 },
    { name: "Music", movies: [], currentIndex: 0 },
    { name: "Musical", movies: [], currentIndex: 0 },
    { name: "Mystery", movies: [], currentIndex: 0 },
    { name: "Romance", movies: [], currentIndex: 0 },
    { name: "Sci-Fi", movies: [], currentIndex: 0 },
    { name: "Short", movies: [], currentIndex: 0 },
    { name: "Sport", movies: [], currentIndex: 0 },
    { name: "Superhero", movies: [], currentIndex: 0 },
    { name: "Thriller", movies: [], currentIndex: 0 },
    { name: "War", movies: [], currentIndex: 0 },
    { name: "Western", movies: [], currentIndex: 0 }
];

  
    onMount(() => {
      genres.forEach((genre, index) => {
        fetchMoviesByGenre(genre.name, index);
      });
    });
  
    async function fetchMoviesByGenre(genre, index) {
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${genre}&type=movie`;
      const response = await fetch(url);
      const data = await response.json();
      genres[index].movies =
        data.Search?.filter((movie) => movie.Type === "movie") || [];
    }
  
    function showNext(genreIndex) {
    genres[genreIndex].currentIndex = (genres[genreIndex].currentIndex + 1) % genres[genreIndex].movies.length;
    genres = [...genres]; // Using the Spread operator to trigger svelete
}

function showPrevious(genreIndex) {
    const length = genres[genreIndex].movies.length;
    genres[genreIndex].currentIndex = (genres[genreIndex].currentIndex - 1 + length) % length;
    genres = [...genres];
}

  
    // Function to get an array of the current movies to display for each genre.
    $: currentMovies = genres.map((genre) => {
      if (genre.movies.length > 0) {
        return [
          genre.movies[genre.currentIndex % genre.movies.length],
          genre.movies[(genre.currentIndex + 1) % genre.movies.length],
          genre.movies[(genre.currentIndex + 2) % genre.movies.length],
          genre.movies[(genre.currentIndex + 3) % genre.movies.length],
          genre.movies[(genre.currentIndex + 4) % genre.movies.length],
        ].filter(Boolean);
      } else {
        return [];
      }
    });
  
  </script>
  
  {#each genres as genre, genreIndex}
    <h1>{genre.name} Movies</h1>
    <div class="carousel-container">
      <button on:click={() => showPrevious(genreIndex)} class="prev"
        >&#10094;</button
      >
      {#if genre.movies.length > 0}
        {#each currentMovies[genreIndex] as movie (movie.imdbID)}
          <MovieCard {movie} />
        {/each}
      {:else}
        <p>Loading movies...</p>
      {/if}
      <button on:click={() => showNext(genreIndex)} class="next">&#10095;</button>
    </div>
  {/each}
  
  <style>
    .carousel-container {
      display: flex;
      justify-content: center;
      gap: 16px;
      padding: 16px 0;
      /* border: white 3px solid; */
      border-radius: 10px;
    }
  
    .carousel-container > * {
      flex: 0 0 auto;
    }
  
    /* .carousel-slide img {
        width: 100%;
        display: block;
      } */
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
      background-color: #ff5858;
    }
  </style>
  