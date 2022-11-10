import React, { useEffect }  from "react"
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, Link} from "react-router-dom"
import '../App.css'
import Carousel from 'react-bootstrap/Carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay} from '@fortawesome/free-solid-svg-icons'
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
          <Carousel controls={false} fade={true} indicators={false} pause={'hover'}>
            {movies.map((item) => (
              <Carousel.Item interval={3600}>
                <img
                  className="img-carousel"
                  src={IMAGE_PATH + item.backdrop_path}
                  alt="First slide"
                />
                {/* <Carousel.Caption>
                  <h1 className="carousel-title text-white">{item.title}</h1>
                </Carousel.Caption> */}
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
    )
}

export default Header;