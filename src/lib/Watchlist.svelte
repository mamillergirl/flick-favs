<script>
    import MovieCard from "./MovieCard.svelte";
    import { getLocalStorage } from './stores.mjs';

    let movieData = getLocalStorage('watchlist');

</script>

{#each movieData as movie}
    {#if movie.Type != "game"}
    <MovieCard {movie}/>
   {/if}
{/each}