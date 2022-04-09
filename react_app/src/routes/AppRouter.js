import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import React from 'react'
import Login from '../components/Login'
import NotFound from "../components/NotFound"
import Register from "../components/Register"
import Home from '../components/Home'

const AppRouter = () => {
  return (
      <>
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/home" element={<Home />} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
      </>
  )
}

export default AppRouter