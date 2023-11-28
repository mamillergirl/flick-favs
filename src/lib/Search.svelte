<script>
    import MovieCard from "./MovieCard.svelte";
    let searchWord = "";
    let movieData = [];
    let currentPage = 1;
    let totalPages = 0;

    async function search(page = 1){
       currentPage = page;
        let url = `https://www.omdbapi.com/?apikey=3ca7a7ca&s=${searchWord}`
        let data = await fetch(url);
        let response = await data.json();

        
        movieData = response.Search;
        console.log(movieData)

    }
    function handleKeyPress(event) {
    if (event.key === "Enter") {
      search(1);
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

<div class="movie-results">
{#if movieData}
{#each movieData as movie}
    {#if movie.Type != "game"}
    <MovieCard {movie}/>
   {/if}
{/each}
{:else}
<div>No Results</div>
{/if}

</div>
<!-- 
<div class="pagination">
  <button on:click={previousPage} disabled={currentPage === 1}>Previous</button>
  <span>Page {currentPage} of {totalPages}</span>
  <button on:click={nextPage} disabled={currentPage === totalPages}>Next</button
  >
</div> -->
<style>
    .movie-results {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        list-style-type: none;
        padding: 0;
    }
</style>