<script>
    let searchWord = "";
    let movieData = [];
    async function search(){
        let url = `https://www.omdbapi.com/?apikey=3ca7a7ca&t=${searchWord}`
        let data = await fetch(url);
        let response = await data.json();
        movieData = [response];
    }
</script>

<fieldset>
    <input bind:value={searchWord}>
    <button on:click={search}>Search</button>
</fieldset>

{#each movieData as movie}
    <div class="movie-card">
        <h2>{movie.Title}</h2>
        <img alt = {movie.Title} src={movie.Poster}>
        <p>Released: {movie.Released}</p>
        <p>Director: {movie.Director}</p>
     
    </div>
{/each}