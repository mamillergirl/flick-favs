<script>
  let searchWord = "";
  let movieData = [];
  let detailedMovieData = [];
  let currentPage = 1;
  let totalPages = 0;

  async function search(page = 1) {
    currentPage = page;
    let url = `https://www.omdbapi.com/?apikey=3ca7a7ca&s=${searchWord}&page=${currentPage}&type=movie`;

    let data = await fetch(url);
    let response = await data.json();

    if (response.Search && response.Search.length) {
      movieData = response.Search.slice(0, 5); // Limit the search to 5 results, can increase
      totalPages = Math.ceil(response.totalResults / 5);
      fetchMovieDetails();
    } else {
      movieData = [];
      detailedMovieData = [];
    }
  }
    // Function to FETCH all movie details, we can narrow this down later to improve performance if need be
  async function fetchMovieDetails() {
    let newDetailedMovieData = [];
    for (let movie of movieData) {
      let url = `https://www.omdbapi.com/?apikey=3ca7a7ca&i=${movie.imdbID}`;
      let data = await fetch(url);
      let movieDetail = await data.json();
      newDetailedMovieData.push(movieDetail);
    }
    detailedMovieData = newDetailedMovieData; // Trigger reactivity
    console.log(detailedMovieData);
  }

  // Function to handle key press in the input field
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      search();
    }
  }

  // The pagination functions
  function nextPage() {
    if (currentPage < totalPages) {
      search(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      search(currentPage - 1);
    }
  }
</script>

<fieldset>
  <input bind:value={searchWord} on:keydown={handleKeyPress} />
  <button on:click={() => search(1)}>Search</button>
</fieldset>

<div class="movies-container">
    {#each detailedMovieData as movie}
    <div class="movie-card">
      <h2>{movie.Title}</h2>
      <img alt={movie.Title} src={movie.Poster} />
      <p>Released: {movie.Released}</p>
      <p>Director: {movie.Director}</p>
      <p>IMDB Rating: {movie.imdbRating}</p>
      <p>Rated: {movie.Rated}</p>
    </div>
  {/each}
</div>


<div class="pagination">
  <button on:click={previousPage} disabled={currentPage === 1}>Previous</button>
  <span>Page {currentPage} of {totalPages}</span>
  <button on:click={nextPage} disabled={currentPage === totalPages}>Next</button
  >
</div>
