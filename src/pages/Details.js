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
    const { details } = useSelector((state) => state.movieDetails)

    useEffect(() => {
        dispatch(getMovieDetails(id))
    }, [])

    return (
        <div style={{backgroundColor: '#171715'}}>
            <HeaderNavbar/>
            {details&&
                <div>
                    <div className='row mx-auto'>
                        <div className='col-md-4'>
                            <img src={IMAGE_PATH + details.poster_path} className='image-details' alt={details.title}></img>
                        </div>
                        <div className='col-md-8'>
                            <div className="text-detail">
                                <h1 className='text-white details-title'>{details.title}</h1>
                                <div className='genre_item'>
                                    {details.genres && details.genres.map((e) => {
                                        return (
                                            <p>{e.name}</p>
                                        )})
                                    }
                                </div>
                                <div className="vote_average">
                                    <FontAwesomeIcon icon={faStar} style={{fontSize: 20, color: '#e69b00'}}/>
                                    <p>{Number(details.vote_average).toFixed(1)} / 10 </p>
                                </div>
                                <div>
                                    <h5 className='text-white'>Synopsis</h5>
                                    <p className='details-overview'>{details.overview}</p>
                                </div>
                                <div className='text-white'>
                                    <h5 className='text-white'>Release Date</h5>
                                    <p>{details.release_date}</p>
                                </div>
                                <div className='text-white'>
                                    <h5 className='text-white'>Country</h5>
                                    {details.production_countries && details.production_countries.map((e) => {
                                        return (
                                            <p>{e.name}</p>
                                        )})
                                    }
                                </div>
                                <div>
                                    <a href = {`https://www.youtube.com/results?search_query=${details.title}`}>
                                        <button className='button-watch'><span style={{marginRight: '0.5rem'}}><FontAwesomeIcon icon={faCirclePlay}/></span>WATCH TRAILER</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <DetailCast/>
            <Footer/>
        </div>
    )
}
