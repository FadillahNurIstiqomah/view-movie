import React from "react"
import '../App.css'
import Carousel from 'react-bootstrap/Carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import c1 from '../img/c1.jpg'
import c2 from '../img/c2.jpg'
import c3 from '../img/c3.jpg'

const HeaderCarousel = () => {
    return (
        <Carousel fade controls={false}>
        <Carousel.Item pause={true}>
          <img
            className="d-block w-100 img-carousel"
            src={c1}
            alt="First slide"
          />
          <Carousel.Caption>
            <div className='containers caption text-start'>
              <h3 className='movie-title'>Doctor Strange in the Multiverse of Madness</h3>
              <p className='movie-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a href="https://www.youtube.com/watch?v=aWzlQ2N6qqg">
                <button className='button-watch'><span style={{marginRight: '0.5rem'}}><FontAwesomeIcon icon={faCirclePlay}/></span>WATCH TRAILER</button>
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-carousel"
            src={c2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <div className='containers caption text-start'>
              <h3 className='movie-title'>Moon Knight</h3>
              <p className='movie-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a href="https://www.youtube.com/watch?v=x7Krla_UxRg">
                <button className='button-watch'><span style={{marginRight: '0.5rem'}}><FontAwesomeIcon icon={faCirclePlay}/></span>WATCH TRAILER</button>
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-carousel"
            src={c3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <div className='containers caption text-start'>
              <h3 className='movie-title'>Jurassic World Dominion</h3>
              <FontAwesomeIcon icon="fa-light fa-circle-play"/>
              <p className='movie-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a href="https://www.youtube.com/watch?v=fb5ELWi-ekk">
                <button className='button-watch'><span style={{marginRight: '0.5rem'}}><FontAwesomeIcon icon={faCirclePlay}/></span>WATCH TRAILER</button>
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
}

export default HeaderCarousel;