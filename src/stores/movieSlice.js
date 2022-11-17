import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    movies: [],
    loading: false,
  }
  
  export const getMovies = createAsyncThunk('movies/getMovies', async () => {
    const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"
    try{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        console.log(res)
        return res.data.results;
    } catch (error) {
        console.error(error);
    }
})
  
  
  export const postSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: {
        [getMovies.pending]: (state) => {
          state.loading = true
        },
        [getMovies.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.movies = payload
        },
        [getMovies.rejected]: (state) => {
          state.loading = false
        },
    },
  })
  
  export default postSlice.reducer