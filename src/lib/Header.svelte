<script>

    import { userStore } from "./stores.mjs";
    import { logout } from "./auth.mjs";
</script>
  
<nav class="nav">

        <div class="header">
        <div id="navLogo"><img src="src\assets\icon-no-background.svg" alt=icon/ class="headerLogo"></div>
        <div id="navName"><h1>flickfaves</h1></div>
        <div id="navHome"><a href="/#home">Home</a></div>
        <div id="navGenre"><a href="#genre">Genres</a></div>
        <div id="navWatchlist"><a href="/#watchlist">Watchlist</a></div>
        {#if $userStore.isLoggedIn}
        <div id="navLogout"><a href="/#home" on:click={logout}>Logout</a></div>
        {:else}
        <div id="NavLogin"><a href="#login">Login</a></div>
        {/if}
        <div id="navSearch"><a href="/#search">Search</a>
        <img src="src\assets\icons8-search.svg" alt="search icon" id="searchIconImage"/>
    </div>
    </div>
    <div class="line1"></div>
    <div class="line2"></div>
</nav>

<style>

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
    width: 99%;
    min-height: 7px;
    max-height: 7px;
    margin-top: 6px;
    margin-bottom: 6px;
}

</style>