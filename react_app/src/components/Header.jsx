import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Modal from './modals/Modal'

const Header = ({user}) => {
  const navigate = useNavigate()
  const [address, setAddress] = useState(null)
  

  useEffect(() => {
    fetch("http://ip-api.com/json/")
    .then(res => res.json())
    .then(data => {
      setAddress({country : data.country, city : data.city})
    })

  }, [address])
  

  const logOut = () => {
    /* global Swal */
    Swal.fire({
      title: 'Do you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Exit',
      cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("session")
          navigate("/")
        }
    });
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
        <a className="navbar-brand"><h1>NoteSys</h1></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
        <ul className="navbar-nav">
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle fs-5" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Me
            </a>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><a className="dropdown-item" style={{cursor : "pointer"}} data-bs-toggle="modal" data-bs-target="#infoModal">Info</a></li>
                <li><a className="dropdown-item" style={{cursor : "pointer"}} onClick={logOut}>Log out</a></li>
            </ul>
            </li>
        </ul><div className='text-secondary fs-5 ms-3'>Connected from {address ? `${address.city}-${address.country}` : '...'}</div>
        </div>
    </div>
    </nav>
    <Modal subjects={null} enrolled={null} data={{
      id : "infoModal",
      title : "My info",
      type : "info"
    }} values={user} />
    </>
  )
}

export default Header