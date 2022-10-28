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
        <div>
            <HeaderNavbar />
                <div>
                    <img src='https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80' 
                    style={{width: '100vw', height: '50vh'}} className='image-details' alt='gambar'></img>
                    <div style={{marginTop:'-200px', marginLeft:'2rem'}}>
                        <h1 className='text-white'>All Movies</h1>
                    </div>
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
            <Footer/>
        </div>
    )
}