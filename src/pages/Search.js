import React, {useEffect} from 'react'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HeaderNavbar from '../components/Navbar'
import { getSearch } from '../stores/searchSlice'
import MovieCard from '../components/MovieCard'

export default function Search() {
    const { name } = useParams();
    const navigate = useNavigate()
    const IMAGE_PATH = `https://image.tmdb.org/t/p/original`
    const dispatch = useDispatch()
    const {search} = useSelector((state) => state.searchMovie)

    useEffect(() => {
        dispatch(getSearch(name))
    }, [])

    return(
        <div>
            <HeaderNavbar />
                <div>
                    <img src='https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80' 
                    style={{width: '100vw', height: '50vh'}} className='image-details' alt='gambar'></img>
                    <div style={{marginTop:'-200px', marginLeft:'2rem'}}>
                        <h1 className='text-white'>All Movies "{name}"</h1>
                    </div>
                    <h2 className='AllMovies-Text'>Search Result "{name}"</h2>
                    <div className='search-result'>
                        {search && search.map((movie) => {
                            if (movie.poster_path !== null) {
                                return (
                                    <MovieCard
                                        key={movie._id}
                                        movie={movie}
                                        onClick={() => navigate(`/${movie.title}`)}
                                    />
                                )
                            }
                        })}
                    </div>
                </div>
            <Footer/>
        </div>
    )
}