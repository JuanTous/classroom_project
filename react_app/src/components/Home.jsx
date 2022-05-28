import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Student from './dashboards/Student';
import Teacher from './dashboards/Teacher'
import Header from './Header';
import Admin from './dashboards/Admin'

const Home = () => {
  const [subjects, setSubjects] = useState([])
  const session = JSON.parse(localStorage.getItem("session"))
  const navigate = useNavigate()

  useEffect(() => {
    if (session === null) {
      navigate("/", { state:  "You must log in first"})
    } else {
      let url = ''
      if (session.profile !== 'Admin') {
        url = session.profile === 'Teacher' ? `http://localhost:9999/course-subjects/teacher/${session.id}` : `http://localhost:9999/course-subjects/program/${session.program.id}`
      }
      session.program && fetch(url)
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(err => {
        err === 'SyntaxError: Unexpected token < in JSON at position 0' && alert(err)
        navigate("/home")
      })
    }
    document.title = `Home | NoteSys`
  }, [])
  
  return (
    <>
    <Header user={session}/>
      <div className="container mt-5">
      {session !== null && session.profile === 'Student' ? (<Student user={session} subjects={subjects}/>) : 
                           session.profile === 'Teacher' ? (<Teacher user={session} subjects={subjects}/>) : 
                           (<Admin user={session}/>)}
      </div>
      </>
  )
}

export default Home