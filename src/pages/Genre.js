import React, { useEffect } from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import HeaderNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getMovieGenre } from "../stores/genrePage"
import { getGenres } from "../stores/genreSlice"
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
  const { genres } = useSelector((state) => state.genres)

  useEffect(() => {
    dispatch(getMovieGenre(genre))
    dispatch(getGenres())
  }, []);

  return (
    <div style={{backgroundColor: '#171715'}}>
        <HeaderNavbar />
        {/* <div style={{display: 'flex'}}>
          <h5 className='popular'>Browse by Category</h5>
          <button className="btn-seeAll" onClick={() => navigate(`/movies`)} style={{marginLeft:'64rem'}}>
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
          </Swiper> */}
          <div className="row" style={{margin: '5rem 3rem'}}>
            <div className="col-md-2">
              <h2 className="text-white">Genres</h2>
              <div>
                {genres.map((e) => {
                  return (
                    <div
                      onClick={() => navigate(`/genres/${e.name}`)}
                    >
                      <button className="button-genre">{e.name}</button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-9">
            <div style={{ marginLeft:'2rem'}}>
            <h1 className='text-white'>{genre}</h1>
        </div>
        <div className='search-result'>
            {genrePage.map((movie) => {
              if (movie.poster_path !== null) {
                return (
                  <div onClick={() => navigate(`/movie/${movie.id}`)}>
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        onClick={() => navigate(`/${movie.title}`)}
                      />
                  </div>
              )}
            })}
  
        </div>
            </div>
          </div>
        <Footer/>
    </div>
  );
}