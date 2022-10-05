import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import HeaderNavbar from './Navbar'
import axios from 'axios'
import { DetailsContent } from './DetailsContent'

export const Details = () => {
    const {id} = useParams()
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const {movie, setMovie} = useState(undefined);

    useEffect(() => {
        if(!movie) {
            axios.get(url, {
                params: {
                    api_key: 'c368a12c060c2bbd33ea2c9aea9366e6'
                }
            }).then((res) => {
                setMovie(res.data);
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [])

    // if (!movie) return <>Loading...</>
    return (
        <div className='font-inter'>
            <HeaderNavbar/>
            <DetailsContent/>
        </div>
  )
}
