import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HeaderNavbar from './Navbar'

export default function Search() {
    const {name} = useParams()
    const [search, setSearch] = useState([])
    const navigate = useNavigate()
    const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"
    
    const handleChange = async (e) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`)
            console.log(res.data.results)
            setSearch(res.data.results)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        handleChange()
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
        </div>
    )
}