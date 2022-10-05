import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faStar} from '@fortawesome/free-solid-svg-icons'

export const DetailsContent = (props) => {
    const imageurl = 'https://image.tmdb.org/t/p/original';
    const {movie} = props;

    return(
        <div className="h-full">
            <div 
                className="flex justify-center items-center relative w-screen h-screen bg-cover bg-center overflow-hidden"
                style={{backgroundImage: "url(" + imageurl + movie['backdrop_path'] + ")"
                }}
            >
                <div className="container block z-40">
                    <h1 className="text-white text-6xl">{movie["title"] ? movie["title"] : ["name"]}</h1>
                    <span className="text-white text-lg">{movie["genres"][0]["name"]}</span>
                    <p className="text-white text-lg w-1/2 mt-6">{movie["overview"]}</p>
                    <div className="flex gap-x-2">
                        <FontAwesomeIcon icon={faStar} style={{fontSize: 20, color: '#e69b00'}}/>
                        <p className="text-white">{Number(movie['vote_average']).toFixed(1)} / 10</p>
                    </div>
                    <a href={!movie['video'] ? '#' : movie['video']}>
                        <button className='button-watch'><span style={{marginRight: '0.5rem'}}><FontAwesomeIcon icon={faCirclePlay}/></span>WATCH TRAILER</button>
                    </a>
                </div>
            </div>
        </div>
    )
}