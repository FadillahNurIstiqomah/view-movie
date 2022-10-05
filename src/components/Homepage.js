import React, { useRef, useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import axios from 'axios'
import '../App.css'
import MovieCard from './MovieCard'
import Header from "./Header"

export default function Homepage (){

  const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"
  const SEARCH_API = "https://api.themoviedb.org/3/search/movie"
  const DISCOVER_API = "https://api.themoviedb.org/3/discover/movie"

  const [movies, setMovies] = useState([])
  const [search, setSearch]= useState();
  const [url_set, setUrl]=useState();
  const [movie, setMovie] = useState({title: "Loading Movies"})
  const navigate = useNavigate()

  const fetchMovies = async (event) => {
    if (event) {
        event.preventDefault()
    }

    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`)

    setMovies(data.results)
    setMovie(data.results[0])
  }

  const searchMovie = async (evt) => {
    if(evt.key === "Enter")
    {
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`+search)
        setMovies(data.results)
        // setMovie(data.results[0])
        setSearch(data.results[0])
    }
  }

  // useEffect(()=>{
  //   fetch(url_set).then(res=>res.json()).then(data=>{
  //   setMovies(data.results);
  //   });
  // },[url_set])
  useEffect(()=>{
   fetchMovies()
  },[])

  return (
    <div>
      <Header/>
      <h3 className='popular'>Popular Movie</h3>
      <Swiper
        slidesPerView={4}
        className="mySwiper"
        style={{margin: '2rem 3rem 4rem 4rem'}}
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