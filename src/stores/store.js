import { configureStore } from "@reduxjs/toolkit";
import movie from '../stores/movieSlice'
import nowplaying from '../stores/nowPlaying'
import genre from '../stores/genreSlice'
import search from '../stores/searchSlice'
import detail from '../stores/detailSlice'
import cast from '../stores/castSlice'
import genrePage from "../stores/genrePage";
import login from "../stores/loginSlice"
import register from "../stores/registerSlice"
import logingoogle from "../stores/loginGoogleSlice"

export const store = configureStore({
    reducer:{
        logins: login,
        regist: register,
        loginGoogle: logingoogle,
        movies: movie,
        nowPlaying: nowplaying,
        genres: genre,
        movieDetails: detail,
        movieCast: cast,
        genrePages: genrePage,
        searchMovie: search,
    },
})