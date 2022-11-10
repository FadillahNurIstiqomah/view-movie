import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    nowplaying: [],
    loading: false,
  }
  
  export const getNowPlaying = createAsyncThunk('movies/getMovies', async () => {
    const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"
    try{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
        return res.data.results;
    } catch (error) {
        console.error(error);
    }
})
  
  
  export const postSlice = createSlice({
    name: 'nowPlaying',
    initialState,
    reducers: {},
    extraReducers: {
        [getNowPlaying.pending]: (state) => {
          state.loading = true
        },
        [getNowPlaying.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.nowplaying = payload
        },
        [getNowPlaying.rejected]: (state) => {
          state.loading = false
        },
    },
  })
  
  export default postSlice.reducer