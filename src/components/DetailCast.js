import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../App.css'
import { useParams } from 'react-router-dom'
import "swiper/css"
import "swiper/css/pagination"
import { getMovieCast } from '../stores/castSlice'


export const DetailCast = () => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"
    const { id } = useParams();
    const dispatch = useDispatch()
    const {cast} = useSelector((state) => state.movieCast)

    useEffect(() => {
        dispatch(getMovieCast(id))
      }, []);

    return (
        <div>
            <div style={{display: 'flex'}}>
                <h3 className='popular mx-auto mb-2 mt-2 p-4'>Movie Cast</h3>
            </div>
            <div className='All-movies'>
            {cast.map((movie) => {
                    if (movie.profile_path !== null) {
                        return (
                            <div className="card card-cast mx-auto">
                                {movie.profile_path &&
                                    <img src={IMAGE_PATH + movie.profile_path} alt={movie.title} className='img_cast mx-auto mt-3'/>
                                }
                                <div className="mx-auto p-3">
                                    <h6 className="text-white title_card">{movie.name}</h6>
                                </div>
                            </div>
                        )
                    } else {
                        return(
                            <div className="card card-cast mx-auto">
                                <img src='https://drive.google.com/uc?export=view&id=1n7mAJr5VOR7W3FyBiss-muB-5R76PSxB' alt={movie.title} className='img_cast mx-auto mt-3'/>
                                <div className="mx-auto p-3">
                                    <h6 className="text-white title_card">{movie.name}</h6>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}