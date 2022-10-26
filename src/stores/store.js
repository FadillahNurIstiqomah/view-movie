import { configureStore } from "@reduxjs/toolkit";
import movie from '../stores/movieSlice'
import genre from '../stores/genreSlice'
import search from '../stores/searchSlice'
import detail from '../stores/detailSlice'
import genrePage from "./genrePage";

export const store = configureStore({
    reducer:{
        movies: movie,
        genres: genre,
        movieDetails: detail,
        genrePages: genrePage,
        searchMovie: search,
    },
})