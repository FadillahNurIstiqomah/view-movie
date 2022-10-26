import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    genres: [],
    loading: false,
  }
  
  export const getGenres = createAsyncThunk('genres/getGenres', async () => {
    const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"
    try{
        const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        return res.data.genres;
    } catch (error) {
        console.error(error);
    }
  })
  
  export const postSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: {
        [getGenres.pending]: (state) => {
          state.loading = true
        },
        [getGenres.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.genres = payload
        },
        [getGenres.rejected]: (state) => {
          state.loading = false
        },
    },
  })
  
  export default postSlice.reducer