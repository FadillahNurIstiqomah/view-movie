import React from "react"

const CastCard = ({movie}) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

    return (
        <div>
            <div className="cast_card">
                {movie.cast.map((e) => {
                    if (e.profile_path !== null) {
                        return (
                            <div>
                                <img className="img_cast" src={IMAGE_PATH + e.profile_path} alt={e.name}/>
                                <h5>{e.name}</h5>
                                <p>{e.character}</p>
                            </div>
                        )
                    } else {
                        return(
                        <div>
                            <img 
                                className="img_cast" 
                                src='https://i.pinimg.com/564x/93/6b/cf/936bcf6964b3bf3c0ccd503056df2bea.jpg' 
                                alt={e.name}
                            />
                            <h5>{e.name}</h5>
                            <p>{e.character}</p>
                        </div>
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default CastCard;