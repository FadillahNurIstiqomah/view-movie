import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    genrePage: [],
    loading: false,
}

export const getMovieGenre = createAsyncThunk('genres/getMovieGenre', async (genre = false) => {
    const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"
    try{
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${genre}`);
        return res.data.results;
    } catch (error) {
        console.error(error);
    }
})
  
  
  export const postSlice = createSlice({
    name: 'genrePage',
    initialState,
    reducers: {},
    extraReducers: {
        [getMovieGenre.pending]: (state) => {
          state.loading = true
        },
        [getMovieGenre.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.genrePage = payload
        },
        [getMovieGenre.rejected]: (state) => {
          state.loading = false
        },
    },
  })
  
  export default postSlice.reducer