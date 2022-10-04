import React, { useRef, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import axios from 'axios'
import '../App.css'
import MovieCard from './MovieCard'

export default function Homepage (){

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
    <div>
      <h3 className='popular'>Popular Movie</h3>
      <Swiper
        slidesPerView={4}
        className="mySwiper swiper-list container"
        style={{width: '100vw'}}
      >
        {movies && movies.map(movie => (
          <SwiperSlide>
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          </SwiperSlide>
        ))}
      </Swiper>
        {/* <div className='containers'>
          {movies && movies.map(movie => (
            <MovieCard
                key={movie.id}
                movie={movie}
            />
          ))}
        </div> */}
    </div>
  );
}