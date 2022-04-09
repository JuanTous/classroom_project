import React from 'react'

export const Footer = () => {
  return (
      <footer className="py-4 mt-auto">
        <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
            <div className="text-light">Copyright &copy; Your Website 2022</div>
            <div className='text-light'>
                <a href="https://github.com/JuanTous/classroom_project/" className="text-light text-decoration-none" target="blank">Source code here<i className="fab fa-github fa-2x text-light ms-1"></i></a>
            </div>
            </div>
        </div>
      </footer>
  )
}

export default Footer;