import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Footer } from './Footer'

export const Register = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState('Student')
  const [user, setUser] = useState({names : "", surnames : "", email : "", password : "", profile : profile, program : {id : ""}, semester : ""})
  const [programs, setPrograms] = useState([])
  const [messages, setMessages] = useState({errors : [], success : []})
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    document.title = `Sign up | NoteSys`
    fetch('http://localhost:9999/programs')
    .then(res => res.json())
    .then(data => setPrograms(data))
  }, [])

  useEffect(()=>{
  }, [loading, messages])

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if(type === 'select-one') {
      user[name]["id"] = value
    }else if(type === 'radio') {
      setProfile(value)
      if (value === 'Student') {
        user.semester = ""
      } else {
        delete user.semester
      }
      setUser({ ...user, [name]: value});
    } else {
      setUser({ ...user, [name]: value});
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    let password;
    //First validation
    Object.keys(user).forEach(k => {
      let value = user[k]
      if (value instanceof Object) {
        return value.id.length === 0 && messages.errors.push(`The ${k} field cannot be empty`) 
      }

      if (k === "password") {
        password = user[k]
      }

      return value.length === 0 && messages.errors.push(`The ${k} field cannot be empty`)
    })

    //Second validation
    let {value : repeatedPassword} = document.getElementsByName("repeatedPassword")[0]
    password !== repeatedPassword && messages.errors.push(`The passwords isn't equals`)
    console.log(messages)
    if (messages.errors.length === 0) {
      
      if (!loading) {
        e.target.querySelector('button').classList.add('disabled')
        fetch(`http://localhost:9999/people/${user.profile === 'Student' ? 'students' : 'teachers'}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
          messages.success.push("The user was successfully registered")
          localStorage.setItem("session", JSON.stringify(data))
          setTimeout(() => {
            navigate(`/Home`)
          }, 5000);
        })
        .finally(()=>{
          setTimeout(() => {
            setLoading(false)
          }, 1000);
        });
      }
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 1);
      setTimeout(() => {
        setMessages({ ...messages, errors: []})
      }, 10000);
    }
  }

  return (
    <>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{borderRadius : "1rem"}}>
            <div className="card-body p-5 text-center">
                <form onSubmit={handleSubmit}>
                <h3 className="mb-5">Sign up</h3>

                  <div className="d-flex justify-content-around mb-3">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" checked={profile === 'Student' && true} name="profile" value="Student" onChange={handleChange}/>
                      <label className="form-check-label">I'm a student</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="profile" value="Teacher" onChange={handleChange}/>
                      <label className="form-check-label">I'm a teacher</label>
                    </div>
                  </div>

                  <div className="form-outline text-start mb-4">
                    <label className="form-label">Names</label>
                    <input type="text" name="names" className="form-control form-control-lg" onChange={handleChange} autoComplete="off" />
                  </div>

                  <div className="form-outline text-start mb-4">
                    <label className="form-label">Surnames</label>
                    <input type="text" name="surnames" className="form-control form-control-lg" onChange={handleChange} autoComplete="off" />
                  </div>

                  <div className="form-outline text-start mb-4">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control form-control-lg" onChange={handleChange} autoComplete="off" />
                  </div>

                  <div className="form-outline text-start mb-4">
                    <label className="form-label">Program</label>
                    <select name="program" className="form-select form-select-lg" onChange={handleChange}>
                      <option value={""} selected disabled>Select any program</option>
                      {programs.length !== 0 && programs.map(({id, name}) => {
                        return <option value={id}>{name}</option>
                      })}
                    </select>                 
                  </div>

                  {profile === 'Student' && (
                    <div className="form-outline text-start mb-4">
                      <label className="form-label">Semester</label>
                      <input type="number" name="semester" className="form-control form-control-lg" onChange={handleChange} autoComplete="off" />
                    </div>
                  )}

                  <div className="form-outline text-start mb-4">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control form-control-lg" onChange={handleChange} autoComplete="off" />
                  </div>

                  <div className="form-outline text-start mb-4">
                    <label className="form-label">Repeat password</label>
                    <input type="password" name="repeatedPassword" className="form-control form-control-lg" autoComplete="off" />
                  </div>

                  {messages.success.length !== 0 && (
                    <div className="form-outline text-start mb-4">
                      {messages.success.map(s => <span className='text-success'>{s}</span>)}
                    </div>
                  )}

                  {messages.errors.length !== 0 && (
                    <div className="form-outline text-start mb-4">
                      {messages.errors.map(e => <li className='text-danger'>{e}</li>)}
                    </div>
                  )}

                <button className={"btn btn-primary btn-lg btn-block"} type="submit">{
                  loading ? (<div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                  </div>) : ('Register')
                  }</button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Register;