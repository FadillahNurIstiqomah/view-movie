import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {Details} from './pages/Details'
import Homepage from './pages/Homepage'
import { AllMovies } from './pages/AllMovies';
import Search from './pages/Search';
import Genres from './pages/Genre';
import { store } from './stores/store'
import { Provider } from 'react-redux'
// import { CategoryPage } from './components/CategoryPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
          <Routes>
            <Route index element={<Homepage />}></Route>
            <Route path="/movie/:id" element={<Details />}></Route>
            <Route path="/movies" element={<AllMovies />}></Route>
            <Route path="/search/:name" element={<Search />}></Route>
            <Route path="/genres/:genre" element={<Genres />} />
            {/* <Route path="/genre/:name" element={<CategoryPage />}></Route> */}
            {/* <Route path="movies/:type" element={<MovieList />}></Route>
            <Route path="/*" element={<h1>Error Page</h1>}></Route> */}
          </Routes>
        </Router>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
