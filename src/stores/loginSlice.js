import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const initialState = {
    login: [],
    loading: false,
}

const firebaseConfig = {
  apiKey: "AIzaSyAe_AfgOJSLG157ZgEzeFIXgdOSis6SsTE",
  authDomain: "login-3abdc.firebaseapp.com",
  projectId: "login-3abdc",
  storageBucket: "login-3abdc.appspot.com",
  messagingSenderId: "975101696557",
  appId: "1:975101696557:web:10c750f6ee4a4d915276a4",
  measurementId: "G-CNKC0BL81D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
  
  export const getLogin = createAsyncThunk('movies/getLogin', async ({name, email, password}) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Success")
      console.log(res)
      localStorage.setItem("login_data", JSON.stringify(res.user.providerData));
      localStorage.setItem("user", JSON.stringify(res.user.accessToken));
      localStorage.setItem("image", JSON.stringify(res.user.providerData[0].photoURL));
      localStorage.setItem("displayName", JSON.stringify(res.user.providerData[0].displayName));

      window.location.reload(1);
    } catch (err) {
      console.error(err);
      alert(err.message);
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