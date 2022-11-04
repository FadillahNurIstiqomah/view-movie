import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const initialState = {
    logingoogle: [],
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
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
  
export const getLoginGoogle = createAsyncThunk('movies/getLoginGoogle', async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    console.log(res)
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    localStorage.setItem("login_data", JSON.stringify(user.providerData));
    localStorage.setItem("user", JSON.stringify(user.accessToken));
    localStorage.setItem("image", JSON.stringify(user.providerData[0].photoURL));
    localStorage.setItem("displayName", JSON.stringify(user.providerData[0].displayName));

    window.location.reload(1);
    return user.providerData;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
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