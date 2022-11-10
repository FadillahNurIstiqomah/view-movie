import React, { useEffect } from "react"
import {useNavigate, Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import '../App.css'
import MovieCard from '../components/MovieCard'
import Header from "../components/Header"
import Footer from '../components/Footer'
import { getMovies } from "../stores/movieSlice"
import { getGenres } from "../stores/genreSlice"
import { getNowPlaying } from "../stores/nowPlaying"

export default function Homepage (){

  const dispatch = useDispatch()
  // const { movies } = useSelector((state) => state.movies)
  const { genres } = useSelector((state) => state.genres)
  const { nowplaying } = useSelector((state) => state.nowPlaying)

  const navigate = useNavigate()

  useEffect(() => {
    // dispatch(getMovies())
    dispatch(getNowPlaying())
    dispatch(getGenres())
  }, [])


  return (
    <div style={{backgroundColor: '#171715'}}>
      <Header/>
      <div style={{display: 'flex'}}>
        <h4 className='popular text-white'>Now Playing</h4>
        <button className="btn-seeAll" onClick={() => navigate(`/movies`)}>
          See All Movie <span><FontAwesomeIcon icon={faArrowRight}/></span>
        </button>
      </div>
      <Swiper
        slidesPerView={6}
        className="mySwiper"
        style={{margin: '1rem 3rem 4rem 4rem'}}
      >
        {nowplaying.map((movie) => (
          <SwiperSlide>
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => navigate(`/${movie.title}`)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{display: 'flex'}}>
        <h5 className='popular text-white'>Browse by Category</h5>
        <button className="btn-seeAll" onClick={() => navigate(`/movies`)} style={{marginLeft:'58rem'}}>
          See All Movie <span><FontAwesomeIcon icon={faArrowRight}/></span>
        </button>
      </div>
      <Swiper
            slidesPerView={8}
            className="mySwiper"
            style={{margin: '1rem 2rem 1rem 4rem'}}
        >
            <div className="movie-popular">
            {genres.map((genre) => (
                <SwiperSlide>
                    <Link to={`/genres/${genre.name}`}>
                      <button className="genre_list">{genre.name}</button>
                    </Link>
                </SwiperSlide>
            ))}
            </div>
      </Swiper>
      {/* <Swiper
        slidesPerView={4}
        className="mySwiper"
        style={{margin: '1rem 3rem 4rem 4rem'}}
      >
        {movies.map((movie) => (
          <SwiperSlide>
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={() => navigate(`/${movie.title}`)}
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
      <Footer/>
    </div>
  );
}