import React from 'react'
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

const Home = () => {

  const sesion = localStorage.getItem("session")

  useEffect(() => {
    document.title = `Home | ${document.title}`
  }, [])
  

  //console.log(JSON.parse(localStorage.removeItem("session")))
  return (
    <div>Home</div>
  )
}

export default Home