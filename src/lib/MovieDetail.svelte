<script>
    export let movie;

    import { getLocalStorage, setLocalStorage} from './stores.mjs';
    let value = 0;
    let saved = false;
    let stars = [1, 2, 3, 4, 5];

    function checkSaved(movieId) {
      let stored = getLocalStorage('watchlist');
      if (stored) {
        const watchlistIds = stored.map(item => item.imdbID); // Extract IMDb IDs from stored items
      
        if (watchlistIds.includes(movie.imdbID)) {
          saved = true;
        }
      }
      
    }

    checkSaved()
    
    function addToWatchlist(){
      const storedItems = getLocalStorage("watchlist") || [];
      storedItems.push(movie);
      setLocalStorage("watchlist", storedItems)
      saved = true;
    }
    
    
    function deleteFromWatchlist(movieId) {
      let cartItems = getLocalStorage("watchlist") || [];

      const updatedCartItems = cartItems.filter(item => item.imdbID !== movie.imdbID);
      console.log(updatedCartItems)

      if (updatedCartItems.length !== cartItems.length) {
        // Item was removed, update local storage with the modified array
        setLocalStorage("watchlist", updatedCartItems);
     
      }
      saved = false;
    }


</script>

<div class="movieDetail">
    <h2 class="overview">Overview</h2>
    <div class="movie-overview">
    <div class="left">
        <img src = {movie.Poster} alt= {movie.Title} />
          {#if !saved}
          <button on:click={() => addToWatchlist()}>
          Add to Watchlist +
         </button>
          {:else}
          <button on:click={() => deleteFromWatchlist()} class = "saved">
          Added to Watchlist &#10003;
          </button>
          {/if}

        
    </div>
    <div class="right">
        <div class="title">
            <div class="title-stars">
            <h2>{movie.Title}</h2>
            <!-- <div class="stars">
                {#each stars as star}
                  <span
                    class="star"
                    on:click={() => setValue(star)}
                    class:selected={value >= star}
                    on:mouseover={() => { value = star }}
                    on:mouseleave={() => { value = 0 }}>
                    &#9733;
                  </span>
                {/each}
              </div> -->
            </div>
            <p>{movie.Year}</p>
        </div>
        <div class="stats">
            <span class="label">Rating:</span> <span>{movie.Rated}</span> 
            <span class="label">Runtime:</span> <span>{movie.Runtime}</span> 
            <span class="label">Genre:</span> <span>{movie.Genre}</span> 
            
        </div>
        <div class="description">
            <h3>Description</h3>
            <p>
                {movie.Plot}
            </p>
        </div>
        <div class="comments">
            <h3>Comments</h3>
            <input placeholder="Share your thoughts...">
        </div>
    </div>
    </div>
</div>

<style>

   .movie-overview {
    display: flex;
    
    justify-content: center;
   }
   .overview {
    font-weight: bold;
    font-size: 35px;
    font-family: 'Anton';
    font-weight: 600;
   }
   .right {
    text-align: start;
    padding: 35px;
    max-width: 780px;
   }
   .movie-overview img {
    width: 350px;
    height: 550px;
    object-fit: cover;
   }
   h2 {
    margin-bottom: 5px;
    padding-right: 15px;
   }
   p {
    margin-top: 5px;
   }
   .label {
    font-weight: bold;
   }
   button {
    background-color:  #ff5858;
    color: white;
    margin: 10px;
    max-width: 200px;
    margin: auto;
   }
   .saved {
    background-color: #232234;
    color: #ff5858;
   }
   
   input {
    width: 100%;
    min-height: 30px;
    background-color: white;
   }
   .left {
    display: flex;
    flex-direction: column;
  
   }

   /* .stars {
        max-height: 24px;
        align-items: center;
   }
   .star {
    font-size: 24px;
    cursor: pointer;
    color: gray;
  }
  .title-stars {
    display: flex;
  }

  .star:hover,
  .star.active {
    color: #ff5858; }*/
  
</style>