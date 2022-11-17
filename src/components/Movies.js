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
        {/* <button className="btn-seeAll" onClick={() => navigate(`/movies`)}>
          See All Movie <span><FontAwesomeIcon icon={faArrowRight}/></span>
        </button> */}
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
      {/* <Swiper
        slidesPerView={4}
        className="mySwiper"
        style={{margin: '1rem 3rem 4rem 4rem'}}
      >
        {movies.map((movie) => (
          <SwiperSlide>
            <div onClick={() => navigate(`/movie/${movie.id}`)}>
              <div className="movie-title">
                    {movie.poster_path &&
                    <img src={IMAGE_PATH + movie.poster_path} alt={movie.title} style={{cursor: 'pointer'}}/>
                    }
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
}