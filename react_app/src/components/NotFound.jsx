import React, { useEffect } from 'react'

const NotFound = () => {
  useEffect(() => {
    document.title = 'Not found :('
    setTimeout(() => {
      window.history.go(-1)
    }, 10000);
  })
  
  return (
    <>
      <div className="context text-center">
        <h1>La pagina que intentas buscar no existe <i className="fas fa-frown"></i></h1>
      </div>


      <div className="area" >
                  <ul className="circles">
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                  </ul>
          </div >
    </>
  )
}

export default NotFound;