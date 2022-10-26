import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode";

const initialState = {
    logingoogle: [],
    loading: false,
  }
  
export const getLoginGoogle = createAsyncThunk('movies/getLoginGoogle', async (credentialResponse) => {
    var decoded = jwt_decode(credentialResponse.credential);
    localStorage.setItem("login_data", JSON.stringify(decoded));
    localStorage.setItem("user", JSON.stringify(credentialResponse.credential));
    localStorage.setItem("image", JSON.stringify(decoded.picture));
    localStorage.setItem("first_name", JSON.stringify(decoded.name));
    Swal.fire("Horeee!", "Login Berhasil!", "success")
})
  
  
  export const postSlice = createSlice({
    name: 'loginGoogle',
    initialState,
    reducers: {},
    extraReducers: {
        [getLoginGoogle.pending]: (state) => {
          state.loading = true
        },
        [getLoginGoogle.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.logingoogle = payload
        },
        [getLoginGoogle.rejected]: (state) => {
          state.loading = false
        },
    },
  })
  
  export default postSlice.reducer