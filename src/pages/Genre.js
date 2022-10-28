import React, { useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import HeaderNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getMovieGenre } from "../stores/genrePage"
import MovieCard from '../components/MovieCard'
import '../App.css'

export default function Genres () {
  const {genre} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { genrePage } = useSelector((state) => state.genrePages)

  useEffect(() => {
    dispatch(getMovieGenre(genre))
  }, []);

  return (
    <div>
        <HeaderNavbar />
        <img  src='https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80' 
            style={{width: '100vw', height: '50vh'}} className='image-details' alt='gambar'></img>
        <div style={{marginTop:'-200px', marginLeft:'2rem'}}>
            <h1 className='text-white'>Genre: {genre}</h1>
        </div>
        <div className='search-result' style={{marginTop:'13rem'}}>
            {genrePage.map((movie) => {
              if (movie.poster_path !== null) {
                return (
                  <div onClick={() => navigate(`/movie/${movie.id}`)} className={"movie"}>
                    
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