import React, {useEffect, useState} from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'
import HeaderNavbar from './Navbar'
import Footer from './Footer'
import { DetailCast } from './DetailCast'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faStar} from '@fortawesome/free-solid-svg-icons'

export const Details = () => {
    const [data, setData] = useState()
    let {id} = useParams()
    const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"
    const IMAGE_PATH = `https://image.tmdb.org/t/p/original`

    const getDetails = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
        let data = res.data
        setData(data)
    }
    
    useEffect(() => {
        getDetails()
      }, []);
    return (
        <div>
            <HeaderNavbar/>
            {data &&
                <div>
                    <img src={IMAGE_PATH + data.backdrop_path} style={{width: '100%', height: '95vh'}} className='image-details' alt='gambar'></img>
                    <div className="text-detail">
                        <h1 className='text-white'>{data.title}</h1>
                        <div className='genre_item'>
                            {data.genres.map((e) => {
                                return (
                                    <p>{e.name}</p>
                                )})
                            }
                        </div>
                        <p style={{width:'50%'}}>{data.overview}</p>
                        <div className="vote_average">
                            <FontAwesomeIcon icon={faStar} style={{fontSize: 20, color: '#e69b00'}}/>
                            <p>{Number(data.vote_average).toFixed(1)} / 10 </p>
                        </div>
                        <div>
                            <a href = {`https://www.youtube.com/results?search_query=${data.title}`}>
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
