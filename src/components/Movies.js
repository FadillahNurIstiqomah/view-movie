import React, { useEffect } from "react"
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import '../App.css'
// import MovieCard from '../components/MovieCard'
import { getMovies } from "../stores/movieSlice"
import MovieCard from './MovieCard'

export default function MoviePage (){

  const dispatch = useDispatch()
  const { movies } = useSelector((state) => state.movies)
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getMovies())
  }, [])


  return (
    <div style={{backgroundColor: '#171715'}}>
      <div style={{display: 'flex'}}>
        <h2 className='popular text-white mx-auto'>Popular Movie</h2>
      </div>
      <div className='All-movies'>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onClick={() => navigate(`/${movie.title}`)}
          />
        ))}
      </div>
    </div>
  );
}