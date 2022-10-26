import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cast: [],
    loading: false,
  }
  
  export const getMovieCast = createAsyncThunk('movies/getMovieCast', async (id = false) => {
    const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"
    try{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
        return res.data.cast;
    } catch (error) {
        console.error(error);
    }
  })
  
  
  export const postSlice = createSlice({
    name: 'movieCast',
    initialState,
    reducers: {},
    extraReducers: {
        [getMovieCast.pending]: (state) => {
          state.loading = true
        },
        [getMovieCast.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.cast = payload
        },
        [getMovieCast.rejected]: (state) => {
          state.loading = false
        },
    },
  })
  
  export default postSlice.reducer