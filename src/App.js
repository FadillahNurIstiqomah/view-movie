import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Carousel from 'react-bootstrap/Carousel'
import MovieCard from './components/MovieCard'
import c1 from './c1.jpg'
import c2 from './c2.jpg'

function App() {
  
  // const MOVIE_API = "https://api.themoviedb.org/3/"
  const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"
  const SEARCH_API = "https://api.themoviedb.org/3/search/movie"
  const DISCOVER_API = "https://api.themoviedb.org/3/discover/movie"

  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [movie, setMovie] = useState({title: "Loading Movies"})

  const fetchMovies = async (event) => {
    if (event) {
        event.preventDefault()
    }

    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`)

    setMovies(data.results)
    setMovie(data.results[0])
  }

  useEffect (() => {
    fetchMovies()
  }, [])

  return (
    <div className="App">
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={c1} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={c2} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      {/* <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={c1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src=''
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
      {/* <header className="center-max-size header">
          <span className={"brand"}>Movie Trailer App</span>
            <form className="form" onSubmit={fetchMovies}>
              <input 
                  className="search" type="text" id="search"
                  onInput={(event) => setSearchKey(event.target.value)}/>
                  <button className="submit-search" type="submit"></button>
            </form>
        </header> */}
        <h2 className='popular'><strong>Popular Movie</strong></h2>
        <div className='container'>
          {movies && movies.map(movie => (
            <MovieCard
                key={movie.id}
                movie={movie}
            />
          ))}
        </div>
    </div>
  );
}

export default App;
