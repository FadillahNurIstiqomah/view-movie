import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
import HeaderNavbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'
import Footer from '../components/Footer'
import { getMovies } from "../stores/movieSlice"

export const AllMovies = () => {

    const { movies } = useSelector((state) => state.movies)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    useEffect(()=>{
        dispatch(getMovies())
    },[])

    return (
        <div style={{backgroundColor: '#171715'}}>
            <HeaderNavbar />
            <h3 className='AllMovies-Text'>Top Rated Movie</h3>
                <div className='All-movies'>
                    {movies.map((movie) => (
                        <MovieCard
                        key={movie._id}
                        movie={movie}
                        onClick={() => navigate(`/${movie.title}`)}
                        />
                    ))}
                </div>
            <Footer/>
        </div>
    )
}