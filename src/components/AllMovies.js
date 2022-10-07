import React, {useEffect, useState} from 'react'
import axios from 'axios'
import HeaderNavbar from './Navbar'
import MovieCard from './MovieCard'
import Footer from './Footer'

export const AllMovies = () => {
    const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"

    const [movies, setMovies] = useState([])
    const [setMovie] = useState({title: "Loading Movies"})
  
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
            <HeaderNavbar />
                <div>
                    <img src='https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80' 
                    style={{width: '100vw', height: '50vh'}} className='image-details' alt='gambar'></img>
                    <div style={{marginTop:'-200px', marginLeft:'2rem'}}>
                        <h1 className='text-white'>All Movies</h1>
                    </div>
                </div>
                <h2 className='AllMovies-Text'>All Movies</h2>
                <div className='All-movies'>
                    {movies && movies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            <Footer/>
        </div>
    )
}
