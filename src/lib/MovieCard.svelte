<script>
    export let movie;
    

  </script>
  
  <div class="movie-card">
    <a href={`#movie-detail?imdb=${movie.imdbID}`}>
    {#if movie.Poster}
    <img src={movie.Poster} alt={movie.title} />
    {:else}
    <img src="https://via.placeholder.com/400" alt="No Poster Available" />
    {/if}
    <h3>{movie.Title}</h3>
    </a>
    </div>
    
  <style>
    .movie-card {
        width: 250px;
        padding: 15px;

    }
    .movie-card img {
        width: 250px;
        height: 350px;
        object-fit: cover;
    }

    h3{
      color:white;
    }
   
  </style>
  