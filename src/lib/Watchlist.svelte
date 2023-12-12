<script>
    import MovieCard from "./MovieCard.svelte";
    import { getLocalStorage } from './stores.mjs';

    let movieData = getLocalStorage('watchlist');

</script>
<h2>Your Watchlist</h2>
{#if movieData.length >= 1}

<div class="watchlist">
    {#each movieData as movie}
        {#if movie.Type != "game"}
        <MovieCard {movie}/>
       {/if}
    {/each}
 </div>
 <a href="#genre"><button>Find More Movies For Your Watchlist</button></a>
{:else}
<p>No movies here</p>
<a href="#genre"><button>Find Movies For Your Watchlist</button></a>
{/if}

<style>
    .watchlist {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        list-style-type: none;
        padding: 0;
    }
</style>