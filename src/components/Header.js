import React, { useEffect }  from "react"
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, Link} from "react-router-dom"
import '../App.css'
import Carousel from 'react-bootstrap/Carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faStar} from '@fortawesome/free-solid-svg-icons'
import c1 from '../img/c1.jpg'
import c2 from '../img/c2.jpg'
import c3 from '../img/c3.jpg'
import HeaderNavbar from "./Navbar"
import { getMovies } from "../stores/movieSlice"

const Header = () => {

  const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
  const dispatch = useDispatch()
  const { movies } = useSelector((state) => state.movies)

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getMovies())
  }, [])
    return (
      <div className="wrapper">
        <HeaderNavbar/> 
          <Carousel controls={false} indicators={false} fade={true} touch={true}>
            {movies.map((item) => (
              <Carousel.Item interval={3600} onClick={() => navigate(`/movie/${item.id}`)} style={{cursor: 'pointer'}}>
                <img
                  className="img-carousel"
                  src={IMAGE_PATH + item.backdrop_path}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <div className='caption text-start'>
                    <h3 className='car-title text-white'>{item.title}</h3>
                    <p className='car-text'>{item.overview}</p>
                    <div className="vote_average">
                        <FontAwesomeIcon icon={faStar} style={{fontSize: 20, color: '#e69b00'}}/>
                        <p>{Number(item.vote_average).toFixed(1)} / 10 </p>
                    </div>
                    <a href={`https://www.youtube.com/results?search_query=${item.title}`}>
                      <button className='button-watch'><span style={{marginRight: '0.5rem'}}><FontAwesomeIcon icon={faCirclePlay}/></span>WATCH TRAILER</button>
                    </a>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
    )
}

export default Header;