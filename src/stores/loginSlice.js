import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'
import axios from "axios";

const initialState = {
    login: [],
    loading: false,
  }
  
  export const getLogin = createAsyncThunk('movies/getLogin', async (value) => {
    try{
        const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users/login",
            value  
        );
        localStorage.setItem("login_data", JSON.stringify(res.data.data));
        localStorage.setItem("user", JSON.stringify(res.data.data.token));
        localStorage.setItem("image", JSON.stringify(res.data.data.image));
        localStorage.setItem("first_name", JSON.stringify(res.data.data.first_name));

        Swal.fire("Horeee!", "Login Berhasil!", "success")
        window.location.reload(1);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email atau Password Salah!"
        })
    }
})
  
  
  export const postSlice = createSlice({
    name: 'logins',
    initialState,
    reducers: {},
    extraReducers: {
        [getLogin.pending]: (state) => {
          state.loading = true
        },
        [getLogin.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.login = payload
        },
        [getLogin.rejected]: (state) => {
          state.loading = false
        },
    },
  })
  
  export default postSlice.reducer