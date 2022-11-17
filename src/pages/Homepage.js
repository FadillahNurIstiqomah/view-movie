import React from "react"
import Header from "../components/Header"
import Footer from '../components/Footer'
import MoviePage from "../components/Movies"

export default function Homepage (){
  return (
    <div style={{backgroundColor: '#171715'}}>
      <Header/>
      <MoviePage/>
      <Footer/>
    </div>
  );
}