import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    details: [],
    loading: false,
  }
  
  export const getMovieDetails = createAsyncThunk('movies/getDetails', async (id = false) => {
    const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"
    try{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        console.log(res)
        return res.data;
    } catch (error) {
        console.error(error);
    }
  })
  
  
  export const postSlice = createSlice({
    name: 'movieDetails',
    initialState,
    reducers: {},
    extraReducers: {
        [getMovieDetails.pending]: (state) => {
          state.loading = true
        },
        [getMovieDetails.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.details = payload
        },
        [getMovieDetails.rejected]: (state) => {
          state.loading = false
        },
    },
  })
  
  export default postSlice.reducer