import React, {useEffect} from 'react'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HeaderNavbar from '../components/Navbar'
import { getSearch } from '../stores/searchSlice'

export default function Search() {
    const { name } = useParams();
    const navigate = useNavigate()
    const IMAGE_PATH = `https://image.tmdb.org/t/p/original`
    const dispatch = useDispatch()
    const {search , loading } = useSelector((state) => state.searchMovie)

    useEffect(() => {
        dispatch(getSearch(name))
    }, [])

    if (loading) return <p>Loading...</p>

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
                        {search && search.map((e) => {
                            if (e.poster_path !== null) {
                                return (
                                    <div onClick={() => navigate(`/movie/${e.id}`)} className={"movie"}>
                                        <div className="movie-title">
                                            {e.poster_path &&
                                            <img src={IMAGE_PATH + e.poster_path} alt={e.title}/>
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            <Footer/>
        </div>
    )
}