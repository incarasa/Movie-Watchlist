const textoGuardado = localStorage.getItem("watchlist");
const resultsContainer = document.getElementById("results-container")
const resCont = document.getElementById("res-container")

let watchlist = []

if (textoGuardado) {
    watchlist = JSON.parse(localStorage.getItem("watchlist"))
}

console.log(watchlist)

function renderWatchlist() {
    if (watchlist.length > 0) {
        resCont.classList.remove("empty")
        moviesHtml = watchlist.map((movie) => 
            `
                        <div class="movie-card">
    
                        <div class="movie-poster">
                            <img src="${movie.Poster}" 
                            alt="Poster of '${movie.Title}'">
                        </div>
    
                        <div class="movie-text">
    
                            <div class="title-stars">
                                <h2>${movie.Title}</h2>
                                <p>🍅 ${getRottenTomatoesScore(movie)}</p>
                            </div>
    
                            <div class="specs">
                                <p>${movie.Runtime}</p>
                                <p>${movie.Genre}</p>
                                <button data-id="${movie.imdbID}"> <i class="fa-solid fa-circle-minus"></i> Watchlist</button>
    
                            </div>
    
                            <div class="description">
                                <p>${movie.Plot}</p>
                            </div>
                        </div>
                    </div>
            `
        ).join("")
        resultsContainer.innerHTML = moviesHtml
    }

    else {
        resCont.classList.add("empty")
        resultsContainer.innerHTML = 
            `<p class="movie-message">Your watchlist is looking a little empty...</p>
             <a class="add-movies" href="index.html">Lets add some movies!!!</a>
            `
    }

}

renderWatchlist()


function getRottenTomatoesScore(movie) {
    const ratingObj = movie.Ratings?.find(rating => rating.Source === "Rotten Tomatoes")
    return ratingObj ? ratingObj.Value : "N/A"
}

document.addEventListener("click", function(e) {
    let elem = e.target.closest('[data-id]')
    if(elem) {
        watchlist = watchlist.filter((movie) => movie.imdbID !== elem.dataset.id)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        renderWatchlist()
    }
})