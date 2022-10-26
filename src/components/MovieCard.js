import React from "react"
import {useNavigate} from "react-router-dom"

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
    );
}

export default MovieCard;