const searchBtn = document.getElementById("search-btn")
const searchEL = document.getElementById("search-el")
const movieList = document.getElementById("movie-list")
const apikey = "YOUR_API_KEY"

searchBtn.addEventListener("click",handleClick)

async function handleClick(e) {
    e.preventDefault()
    let movieArr = ''
    let searchInput = searchEL.value

    if(!searchInput) {
        console.log("cannot read empty string!")
    }else {

        const url = `http://www.omdbapi.com/?apikey=${apikey}&s=${searchInput}`
        const res = await fetch(url)
        const data = await res.json()
        const result = await data.Search
        const idArr = result.map(movie => movie.imdbID)

        for(let movieId of idArr) {
            const movie = await getMovieInfo(movieId)
            const {Title, Plot, Poster, Runtime, Genre} = movie
            const Metascore = movie.Metascore === "N/A" ? movie.Metascore : movie.Metascore / 10
            console.log(movie)
                movieArr +=`
            <div class="movie" id="movie">
                <div class="img-container">
                    <img class="poster" src="${Poster}" alt="">
                </div>
                <div class="movie-info">
                    <div class="title-info">
                        <h2>${Title}</h2>
                        <span class="rating">⭐${Metascore}</span>
                    </div>
                    
                    <div>
                        <span>${Runtime}</span>
                        <span>${Genre}</span>
                    </div>
                    <p>${Plot}</p>
                </div>
            </div>
            `
        }
        movieList.innerHTML = movieArr
    }
}

async function getMovieInfo(imdbID) {
     const res = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${imdbID}`)
     const data = await res.json()
     return data
}
