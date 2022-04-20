import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Student from './dashboards/Student';
import Teacher from './dashboards/Teacher'
import Header from './Header';

const Home = () => {
  const [subjects, setSubjects] = useState([])
  const session = JSON.parse(localStorage.getItem("session"))
  const navigate = useNavigate()

  useEffect(() => {
    if (session === null) {
      navigate("/", { state:  "You must log in first"})
    } else {
      fetch(`http://localhost:9999/subjects/program/${session.program.id}`)
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(err => {
        alert(err)
        window.location.reload()
      })
    }
    document.title = `Home | NoteSys`
  }, [])
  
  return (
    <>
    <Header/>
      <div className="container mt-5">
      {session !== null && session.profile === 'Student' ? (<Student user={session} subjects={subjects}/>) : (<Teacher user={session} subjects={subjects}/>)}
      </div>
      </>
  )
}

export default Home