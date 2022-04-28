import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const Modal = (props) => {
  var {values} = props
  var [message, setMessage] = useState("")
  const {data, subjects, enrolled} = props
  const [teachers, setTeachers] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
  }, [subjects, teachers, message, values])
  

  const handleChange = (e) => {
    const {name, value} = e.target
    if (name === "subject") {
      document.getElementsByName("teacher")[0].options.selectedIndex = 0
      values.teacher.id = null;
      fetch(`http://localhost:9999/people/teachers/program/${subjects.find(a => a.id === parseInt(value)).program.id}`)
      .then(res => res.json())
      .then(data => setTeachers(data))
      .catch(err => setMessage(err))
    }
    values[name].id = parseInt(value);
  }

  const handleSubmit = (e) => {
    message = ""
    if(values.subject.id === null | values.teacher.id === null){
      setMessage("There are unselected fields")
      return null;
    } else {
      if(message === ""){
        const find = enrolled.find(e => e.student.id === values.student.id && e.subject.id === values.subject.id && e.teacher.id === values.teacher.id)
        if (find) {
          setMessage("Is already enrolled")
        } else {
          fetch(`http://localhost:9999/enrolled`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
          .then(res => res.ok === true && res.json())
          .then(data => {
            if (data) {
              values.subject.id = null
              values.teacher.id = null
              document.getElementsByName("subject")[0].options.selectedIndex = 0
              document.getElementsByName("teacher")[0].options.selectedIndex = 0
              // eslint-disable-next-line no-undef
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your subject has been enrolled',
                showConfirmButton: false,
                timer: 1500
              })
              setInterval(() => {
                window.location.reload()
              }, 2000);
            } else {
              setMessage("An error has occurred when registering the subject")
            }
          })
          .catch(err => setMessage(err))
        }
      }
    }
  }

  return (
    <>
      <div className="modal fade" id={data.id} tabIndex="-1" aria-labelledby={"exampleModalLabel"+data.id} aria-hidden="true">
        <div className="modal-dialog" style={{top : "8rem"}}>
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h3 className="modal-title text-uppercase" id={"exampleModalLabel"+data.id} >{data.title}</h3>
            </div>
            <div className="modal-body">
              {data.type === 'info' ? 
              Object.keys(values).map((k, i) => {
                return i !== 0 && <div className='text-uppercase fs-5'><span className='fw-bolder'>{k}:</span> {values[k] instanceof Object ? `${values[k].name}` : `${values[k]}`}</div>
              })
              :
              (<>
                <div className="form-outline text-start mb-4">
                  <label className="form-label">Subjects availables</label>
                  <select name="subject" className="form-select form-select-lg" onChange={handleChange}>
                    <option value={""} selected disabled>Select subject to enroll</option>
                    {subjects.length !== 0 && subjects.map(({id, name}) => {
                      return <option value={id}>{name}</option>
                    })}
                  </select>                 
                </div>
                <div className="form-outline text-start mb-4">
                  <label className="form-label">Teachers availables</label>
                  <select name="teacher" className="form-select form-select-lg" onChange={handleChange}>
                    <option value={""} selected disabled>Select teacher to enroll</option>
                    {teachers.length !== 0 && teachers.map(({id, names, surnames}) => {
                      return <option value={id}>{names} {surnames}</option>
                    })}
                  </select>                 
                </div>
              </>)
              }
              {message !== "" && <li className='text-danger fs-3'>{message}</li>}
            </div>
            <div className="modal-footer">
              {data.type !== 'info' && <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{data.type === 'enroll' ? 'Enroll me' : 'Save'}</button>}
              <button type="button" className="btn btn-danger" onClick={() => setMessage("")} data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal