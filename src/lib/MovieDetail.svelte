<script>
    export let movie;
    import { route } from './stores.mjs';
    let value = 0;
  
   

    let stars = [1, 2, 3, 4, 5];
  


</script>

<div>
    <h2 class="overview">Overview</h2>
    <div class="movie-overview">
    <div class="left">
        <img src = {movie.Poster} alt= {movie.Title} />
        <button>Add to Watchlist +</button>
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
   }
   
   input {
    width: 100%;
    min-height: 30px;
    background-color: white;
   }

   .stars {
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
    color: #ff5858;
  }
</style>