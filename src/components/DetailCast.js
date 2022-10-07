import React, {useEffect, useState} from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/pagination"
import CastCard from './CastCard'

export const DetailCast = () => {
    const [data, setData] = useState()
    let {id} = useParams()
    const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"

    const getCast = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
            let data = res.data
            setData(data)
    }
    useEffect(() => {
        getCast()
      }, []);

    return (
        <div>
            <h3 className='popular'>Cast</h3>
            {data &&
                <CastCard
                    key={data.id}
                    movie={data}
                />
            }
            {/* <Swiper
                slidesPerView={4}
                className="mySwiper"
                style={{margin: '2rem 3rem 4rem 4rem'}}
            >
                {data &&
                    <SwiperSlide>
                        <CastCard
                            key={data.id}
                            movie={data}
                        />
                    </SwiperSlide>
                }
            </Swiper> */}
        </div>
    )
}