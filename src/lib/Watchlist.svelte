<script>
    import MovieCard from "./MovieCard.svelte";
    import { getLocalStorage } from './stores.mjs';

    let movieData = getLocalStorage('watchlist');

</script>
<div class="watchlist">
{#each movieData as movie}
    {#if movie.Type != "game"}
    <MovieCard {movie}/>
   {/if}
{/each}
</div>
<style>
    .watchlist {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        list-style-type: none;
        padding: 0;
    }
</style>