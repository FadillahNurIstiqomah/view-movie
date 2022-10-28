import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'antd';
import '../App.css'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { getMovieCast } from '../stores/castSlice'

const { Meta } = Card;

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
            <h3 className='popular'>Cast</h3>
            <Swiper
                slidesPerView={5}
                className="mySwiper"
                style={{margin: '0 3rem 4rem 4rem'}}
            >
                {cast.map((movie) => {
                    if (movie.profile_path !== null) {
                        return (
                            <SwiperSlide>
                                <div className="movie-title">
                                    {movie.profile_path &&
                                        <Card
                                            hoverable
                                            style={{
                                            width: 240,
                                            }}
                                            cover={<img alt={movie.name} src={IMAGE_PATH + movie.profile_path} />}
                                        >
                                            <Meta title={movie.name} description={movie.character} />
                                        </Card>
                                    }
                                </div>
                            </SwiperSlide>
                        )
                    }
                })}
            </Swiper>
        </div>
    )
}