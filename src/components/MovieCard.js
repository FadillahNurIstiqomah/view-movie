import React from "react"
import {useNavigate} from "react-router-dom"
import { Card } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'


const MovieCard = ({movie}) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/movie/${movie.id}`)} className={"movie"}>
            <div className="movie-title">
                {movie.poster_path &&
                <img src={IMAGE_PATH + movie.poster_path} alt={movie.title}/>
                }
            </div>
        </div>
        // <div>
        //     <Card
        //         onClick={() => navigate(`/movie/${movie.id}`)}
        //         style={{cursor: 'pointer', border:'none' }}
        //         className="ant-card-cover"
        //         cover={
        //             <img style={{borderRadius: '15px', width:'95%'}} src={IMAGE_PATH + movie.poster_path} alt={movie.title}/>
        //         }
        //     >
        //         <div className="title text-white">
        //             <p>{movie.original_title}</p>
        //             <div style={{display: 'flex', gap:'0.5rem'}}>
        //                 <FontAwesomeIcon icon={faStar} style={{fontSize: 20, color: '#e69b00'}}/>
        //                 <p>{Number(movie.vote_average).toFixed(1)} / 10 </p>
        //             </div>
        //             <p>{movie.release_date}</p>
        //         </div>
        //     </Card>
        // </div>
        
    );
}

export default MovieCard;