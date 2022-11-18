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
    const dispatch = useDispatch()
    const {search} = useSelector((state) => state.searchMovie)

    useEffect(() => {
        dispatch(getSearch(name))
    }, [])

    return(
        <div style={{backgroundColor: '#171715'}}>
            <HeaderNavbar />
                <div>
                    <h2 className='genre-header'>Search Result "{name}"</h2>
                    <div className='All-movies'>
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