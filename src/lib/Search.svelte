<script>
    import { onMount } from "svelte";
    import MovieCard from "./MovieCard.svelte";
    
    let searchWord;
    let movieData = [];
    let currentPage = 1;
    let totalPages = 0;
    let apiKey= import.meta.env.VITE_API_KEY
    let inputElement;

    onMount(() => {
      inputElement.focus();
    });

    async function search(page = 1){
        currentPage = page;
        let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchWord}&page=${page}`;
        let response = await fetch(url).then(res => res.json());

        if (response.Response === "True") {
            movieData = response.Search;
            totalPages = Math.ceil(response.totalResults / 10); // Assuming 10 results per page
        } else {
            movieData = [];
            totalPages = 0;
        }
    }
    function handleKeyPress(event) {
    if (event.key === "Enter") {
      search(1);
    }
  }
  function handleInputChange() {
    search(1); 
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
<nav class="nav">
  <div class="header">
  <div id="navLogo"><img src="src\assets\icon-no-background.svg" alt=icon/ class="headerLogo"></div>
  <div id="navName"><h1>flickfaves</h1></div>
  <div id="navHome"><a href="/#home">Home</a></div>
  <div id="navGenre"><a href="#genre">Genres</a></div>
  <div id="navWatchlist"><a href="/#watchlist">Watchlist</a></div>
  <!-- <div id="navSearch"><input class = "navSearch" placeholder="Search" bind:value={searchWord} on:change={()=> search(1)} /> -->
  <div id="navSearch">

    <input class="navSearch" placeholder="Search"  bind:this={inputElement}  bind:value={searchWord} on:input={handleInputChange}  on:keypress={handleKeyPress} />
      <img src="src\assets\icons8-search.svg" alt="search icon" id="searchIconImage"/>
    </div>

</div>

<div class="line1"></div>
<div class="line2"></div>
</nav>



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

<div class="pagination">
  <button on:click={previousPage} disabled={currentPage === 1}>Previous</button>
  <span>Page {currentPage} of {totalPages}</span>
  <button on:click={nextPage} disabled={currentPage === totalPages}>Next</button>
</div>
<style>
  input:focus {
    outline: none;
  }
  input {
    outline: 1px solid #FF5858;
  }
  
  .movie-results {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      list-style-type: none;
      padding: 0;
  }


a{
    color:white;
    &:hover {
    color:#FF5858;
    }
}

h1{
    margin:0;
}

.header{
    display: flex;
    align-items: center;
    max-width: 100%;
    text-align: center;
}

#navLogo{
    flex-grow: 2.5;
    max-width: 50px;
    margin: 15px 5px 10px 15px;
}

#navName {
    flex-grow: 3;
    text-align: start;
}

#navHome {
    flex-grow: .5;
}

#navGenre {
    flex-grow: .5;
}

#navWatchlist {
    flex-grow: .5;
}

#navSearch {
    flex-grow: 1;
    align-items: center;
    & a {
        border: 1px solid #FF5858;
        padding: .25rem 10rem .25rem .25rem;
        &:hover {
            color:white;
            border: 1px solid white;
        }
    }
    & #searchIconImage {
    max-width: 25px;
    max-height:25px;
    }
}


.line1, .line2 {
    background-color: #FF5858;
    width:100%;
    min-height: 7px;
    max-height: 7px;
    margin-top: 6px;
    margin-bottom: 6px;
}
.navSearch {
  background-color: #232234;
  border: 1px solid #FF5858;
  width: 200px;
  color: white;
  font-family: 'Inter', sans-serif;
  outline: none;

}
</style>