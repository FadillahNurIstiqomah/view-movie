import React, {useEffect} from 'react'
import '../App.css'
import {useParams} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import HeaderNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import { DetailCast } from '../components/DetailCast'
import { getMovieDetails } from '../stores/detailSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faStar} from '@fortawesome/free-solid-svg-icons'

export const Details = () => {
    const { id } = useParams();
    const IMAGE_PATH = `https://image.tmdb.org/t/p/original`
    const dispatch = useDispatch()
    const {details , loading } = useSelector((state) => state.movieDetails)

    useEffect(() => {
        dispatch(getMovieDetails(id))
    }, [])

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <HeaderNavbar/>
            {details&&
                <div>
                    <img src={IMAGE_PATH + details.backdrop_path || details.profile_path} style={{width: '100%', height: '95vh'}} className='image-popular' alt='gambar'></img>
                    <div className="text-detail">
                        <h1 className='text-white'>{details.title}</h1>
                        {/* <div className='genre_item'>
                            {details.genres.map((e) => {
                                return (
                                    <p>{e.name}</p>
                                )})
                            }
                        </div> */}
                        <p style={{width:'50%'}}>{details.overview}</p>
                        <div className="vote_average">
                            <FontAwesomeIcon icon={faStar} style={{fontSize: 20, color: '#e69b00'}}/>
                            <p>{Number(details.vote_average).toFixed(1)} / 10 </p>
                        </div>
                        <div>
                            <a href = {`https://www.youtube.com/results?search_query=${details.title}`}>
                                <button className='button-watch'><span style={{marginRight: '0.5rem'}}><FontAwesomeIcon icon={faCirclePlay}/></span>WATCH TRAILER</button>
                            </a>
                        </div>
                    </div>
                </div>
            }
            <DetailCast/>
            <Footer/>
        </div>
    )
}
