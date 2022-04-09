import React from 'react'
import {useState} from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
  const [user, setUser] = useState({email : "", password : ""})
  const [loading, setloading] = useState(false)
  const [error, setError] = useState("")

  /*useEffect(() => {
    fetch('http://localhost:9999/people/students/1')
    .then(res => res.json())
    .then(data => console.log(data))*/

    /*fetch("https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708")
    .then(res => res.json())
    .then(data => console.log(data))

  })*/

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.id === 'showPassword') {
      if (e.target.checked) {
        document.getElementsByName('password')[0].setAttribute("type", "text")
      } else {
        document.getElementsByName('password')[0].setAttribute("type", "password")
      }
      return
    }

    setUser({ ...user, [name]: value});
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    setError("")
    fetch(`http://localhost:9999/people/auth?email=${user.email}&password=${user.password}`, {
      method: 'POST'
    })
    .then(res => res.ok === true && res.json())
    .then(data => data && data != null ? console.log(data) : setError("the username or password is incorrect"))
    .catch(err => {
      console.error(err)
    })
    .finally(() => setloading(false))
  }
  return (
      <>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{borderRadius : "1rem"}}>
                <div className="card-body p-5 text-center">
                  <form onSubmit={handleSubmit}>
                  <h3 className="mb-5">Sign in</h3>

                  <div className="form-outline text-start mb-4">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control form-control-lg" onChange={handleChange} autoComplete="off" />
                  </div>

                  <div className="form-outline text-start mb-4">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control form-control-lg" onChange={handleChange} autoComplete="off" />
                  </div>

                  <div className="form-check d-flex justify-content-start mb-4">
                    <input className="form-check-input" type="checkbox" id="showPassword" onChange={handleChange}/>
                    <label className="form-check-label ms-2" htmlFor="form1Example3"> Show password </label>
                  </div>

                  {error.length !== 0 && (
                    <div className="form-outline text-start mb-4">
                      <label className='text-danger'><i className="fas fa-times me-1"></i>{error}</label>
                    </div>
                  )}

                  <button className={loading ? "btn btn-primary btn-lg btn-block disabled" : "btn btn-primary btn-lg btn-block"} type="submit">{
                  loading ? (<div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                  </div>) : ('Login')
                  }</button>

                  <div className="justify-content-start text-center mb-4 mt-4">          
                    <NavLink to={"/register"}>Do you haven't an account yet?</NavLink>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default Login;