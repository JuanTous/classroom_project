import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Student from './dashboards/Student';
import Teacher from './dashboards/Teacher'
import Header from './Header';

const Home = () => {
  const session = JSON.parse(localStorage.getItem("session"))
  const navigate = useNavigate()

  useEffect(() => {
    session === null && navigate("/", { state:  "You must log in first"})
    document.title = `Home | NoteSys`
  }, [])
  
  return (
    <>
    <Header/>
      <div className="container mt-5">
      {session !== null && session.profile === 'Student' ? (<Student user={session} />) : (<Teacher user={session} />)}
      </div>
      </>
  )
}

export default Home