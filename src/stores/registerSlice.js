import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'
import axios from "axios";

const initialState = {
    register: [],
    loading: false,
  }
  
  export const getRegister = createAsyncThunk('movies/getRegister', async (valueRegist) => {
    console.log(valueRegist);
    try{
        const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users",
        valueRegist
        );
        
        Swal.fire("Horeee!", "Registrasi Berhasil!", "success")
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Kamu sudah pernah registrasi!"
        })
    }
})
  
  
  export const postSlice = createSlice({
    name: 'regist',
    initialState,
    reducers: {},
    extraReducers: {
        [getRegister.pending]: (state) => {
          state.loading = true
        },
        [getRegister.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.register = payload
        },
        [getRegister.rejected]: (state) => {
          state.loading = false
        },
    },
  })
  
  export default postSlice.reducer