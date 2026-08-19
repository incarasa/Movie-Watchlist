const searchButton = document.getElementById("search-button")
const searchInput = document.getElementById("search-input")
const resultsContainer = document.getElementById("results-container")
let movieTitles = []
let movieData = []

searchButton.addEventListener("click", function() {
    let searchText = searchInput.value
    fetch(`https://www.omdbapi.com/?apikey=6aa3ae28&s=${searchText}`)
        .then(res => res.json())
        .then(data => {
            movieTitles = data.Search.map((movie) => movie.Title)
            getMovieData()
        })
})

function getMovieData() {
    movieTitles.forEach((movieTitle) => {
        fetch(`https://www.omdbapi.com/?apikey=6aa3ae28&t=${movieTitle}&type=movie`)
            .then(res => res.json())
            .then(data => {
                movieData.push(data)
                renderMovies()
            })
    })
}

function renderMovies() {
    let moviesHtmlArray = movieData.map((movie) => 
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
                            <button> <i class="fa-sharp fa-solid fa-circle-plus"></i> Watchlist</button>

                        </div>

                        <div class="description">
                            <p>${movie.Plot}</p>
                        </div>
                    </div>
                </div>
        `
    ).join("")
    
    resultsContainer.innerHTML = moviesHtmlArray
}

function getRottenTomatoesScore(movie) {
    const ratingObj = movie.Ratings?.find(rating => rating.Source === "Rotten Tomatoes")
    return ratingObj ? ratingObj.Value : "N/A"
}