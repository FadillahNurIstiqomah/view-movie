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
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID 
}


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
  
  export const getLogin = createAsyncThunk('movies/getLogin', async ({name, email, password}) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      
      localStorage.setItem("login_data", JSON.stringify(res.user.providerData));
      localStorage.setItem("user", JSON.stringify(res.user.accessToken));
      localStorage.setItem("image", JSON.stringify(res.user.providerData[0].photoURL));
      localStorage.setItem("displayName", JSON.stringify(res.user.providerData[0].displayName));
      localStorage.setItem("email", JSON.stringify(res.user.providerData[0].email));

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