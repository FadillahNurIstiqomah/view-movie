import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useParams } from 'react-router-dom'
import axios from "axios";

const initialState = {
    search: [],
    loading: false,
  }
  
  export const getSearch = createAsyncThunk('movies/getSearch', async (name = false) => {
    const API_KEY = "c368a12c060c2bbd33ea2c9aea9366e6"
    try{
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`);
        console.log(res)
        return res.data.results;
    } catch (error) {
        console.error(error);
    }
})
  
  
  export const postSlice = createSlice({
    name: 'searchMovie',
    initialState,
    reducers: {},
    extraReducers: {
        [getSearch.pending]: (state) => {
          state.loading = true
        },
        [getSearch.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.search = payload
        },
        [getSearch.rejected]: (state) => {
          state.loading = false
        },
    },
  })
  
  export default postSlice.reducer