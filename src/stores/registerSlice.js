import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import ava from '../img/profile_picture.png'
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";

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
const db = getFirestore(app);

const initialState = {
    register: [],
    loading: false,
  }
  
  export const getRegister = createAsyncThunk('movies/getRegister', async ({name, email, password}) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
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