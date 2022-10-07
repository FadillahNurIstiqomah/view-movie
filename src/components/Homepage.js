import React, { useRef, useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import '../App.css'
import MovieCard from './MovieCard'
import Header from "./Header"
import Footer from './Footer'

export default function Homepage (){

  const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"

  const [movies, setMovies] = useState([])
  const [setMovie] = useState({title: "Loading Movies"})
  const navigate = useNavigate()

  const fetchMovies = async (event) => {
    if (event) {
        event.preventDefault()
    }

    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`)
    setMovies(data.results)
    setMovie(data.results[0])
  }

  useEffect(()=>{
   fetchMovies()
  },[])

  return (
    <div>
      <Header/>
      <div style={{display: 'flex'}}>
        <h4 className='popular'>Popular Movie</h4>
        <button className="btn-seeAll" onClick={() => navigate(`/movies`)}>
          See All Movie <span><FontAwesomeIcon icon={faArrowRight}/></span>
        </button>
      </div>
      <Swiper
        slidesPerView={4}
        className="mySwiper"
        style={{margin: '1rem 3rem 4rem 4rem'}}
      >
        {movies && movies.map(movie => (
          <SwiperSlide>
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => navigate(`/${movie.title}`)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Footer/>
    </div>
  );
}