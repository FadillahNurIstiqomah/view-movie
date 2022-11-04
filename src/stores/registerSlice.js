import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ava from '../img/profile_picture.png'
import {
  GoogleAuthProvider,
  getAuth,
  updateProfile,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const initialState = {
    register: [],
    loading: false,
  }
  
  export const getRegister = createAsyncThunk('movies/getRegister', async ({name, email, password}) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res)
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
      await updateProfile(auth.currentUser, { displayName: name}).catch((err) =>
      console.log(err)
      )
      await updateProfile(auth.currentUser, { photoURL: ava }).catch((err) =>
      console.log(err)
      )
    } catch (err) {
      console.error(err);
      alert(err.message);
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