import React, { useEffect } from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import HeaderNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getMovieGenre } from "../stores/genrePage"
import { getGenres } from "../stores/genreSlice"
import { getMovies } from "../stores/movieSlice"
import MovieCard from '../components/MovieCard'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import '../App.css'

export default function Genres () {
  const {genre} = useParams()
  const navigate = useNavigate()
  // const router = useRouter();
  const dispatch = useDispatch()
  const { genrePage } = useSelector((state) => state.genrePages)
  const { movies } = useSelector((state) => state.movies)
  const { genres } = useSelector((state) => state.genres)

  useEffect(() => {
    dispatch(getMovieGenre(genre))
    dispatch(getGenres())
    dispatch(getMovies())
  }, []);

  return (
    <div style={{backgroundColor: '#171715'}}>
        <HeaderNavbar />
          <h3 className="genre-header">Browse by Genre Movie</h3>
          <Swiper
                breakpoints={{
                  1008: {
                    slidesPerView: 8,
                  },
                  390: {
                    slidesPerView: 2,
                  },
                }}
                // slidesPerView={8}
                className="mySwiper"
                style={{margin: '2rem 3rem'}}
            >
                <div className="movie-popular">
                {genres.map((genre) => (
                    <SwiperSlide>
                        <Link to={`/genres/${genre.name}`}>
                          <button className="genre_list" onClick={'#genre-result'}>{genre.name}</button>
                        </Link>
                    </SwiperSlide>
                ))}
                </div>
          </Swiper>
          <div className='All-movies'>
              {genrePage.map((movie) => {
                if (movie.poster_path !== null) {
                  return (
                    <div onClick={() => navigate(`/movie/${movie.id}`)} id='genre-result'>
                        <MovieCard
                          key={movie._id}
                          movie={movie}
                          onClick={() => navigate(`/${movie.title}`)}
                        />
                    </div>
                )}
              })}
          </div>
        <Footer/>
    </div>
  );
}