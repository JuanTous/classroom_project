import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const Modal = (props) => {
  var {values} = props
  var [message, setMessage] = useState("")
  const {data, subjects, enrolled} = props
  const [subjectData, setSubjectData] = useState(null)

  useEffect(() => {
  }, [subjects, subjectData, message, values])

  const handleNoteChange = (e) => {
    const {name, value} = e.target;
    values[name] = value;
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    values[name].id = parseInt(value);
    setSubjectData(subjects.find(s => s.id === parseInt(value)))
  }

  const handleSubmit = (e) => {
    message = ""
    console.log(values)
    if(subjectData === null){
      setMessage("There are unselected fields")
      return null;
    } else {
      if(message === ""){
        const find = enrolled.find(e => e.student.id === values.student.id && e.courseSubject.id === values.courseSubject.id)
        if (find) {
          setMessage("Is already enrolled")
        } else {
          values.courseSubject = subjectData
          console.log(values)
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
              setSubjectData(null)
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
              data.type === 'assign' ? 
              <>
                    <div className="form-outline text-start mb-4">
                      <label className="form-label">First score</label>
                      <input type="number" name="firstScore" className="form-control form-control-lg" onChange={handleNoteChange} min={"1"} max={"5"} autoComplete="off" />
                    </div>
                    <div className="form-outline text-start mb-4">
                      <label className="form-label">Second score</label>
                      <input type="number" name="secondScore" className="form-control form-control-lg" onChange={handleNoteChange} min={"1"} max={"5"} autoComplete="off" />
                    </div>
                    <div className="form-outline text-start mb-4">
                      <label className="form-label">Third score</label>
                      <input type="number" name="thirdScore" className="form-control form-control-lg" onChange={handleNoteChange} min={"1"} max={"5"} autoComplete="off" />
                    </div>
              </>
              :
              (<>
                <div className="form-outline text-start mb-4">
                  <label className="form-label">Subjects availables</label>
                  <select name="courseSubject" className="form-select form-select-lg" onChange={handleChange}>
                    <option value={""} selected disabled>Select subject to enroll</option>
                    {subjects.length !== 0 && subjects.map(s => {
                      return <option value={s.id}>{s.subject.name}</option>
                    })}
                  </select>                 
                </div>
                <div className="form-outline text-start mb-4">
                  <label className="form-label">Subject data</label>
                  {subjectData !== null && 
                  <>
                  <li>PROGRAM: {subjectData.subject.program.name}</li>
                  <li>TEACHER: {subjectData.teacher.names} {subjectData.teacher.surnames} - {subjectData.teacher.email}</li>
                  <li>CREDITS: {subjectData.subject.credits}</li>
                  <li>START DATE: {new Date(subjectData.startDate).toLocaleDateString('es-co', { weekday:"long", year:"numeric", month:"long", day:"numeric"})}</li>
                  <li>END DATE: {new Date(subjectData.endDate).toLocaleDateString('es-co', { weekday:"long", year:"numeric", month:"long", day:"numeric"})}</li>
                  </>}               
                </div>
              </>)
              }
              {message !== "" && <li className='text-danger fs-3'>{message}</li>}
            </div>
            <div className="modal-footer">
              {data.type !== 'info' && <button type="submit" className="btn btn-primary" onClick={data.type !== 'assign' ? handleSubmit : ()=>{
                          fetch(`http://localhost:9999/enrolled/${values.id}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(values)
                          })
                          .then(res => res.ok === true && res.json())
                          .then(data => {
                            if (data) {
                              // eslint-disable-next-line no-undef
                              Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your subject has been updated',
                                showConfirmButton: false,
                                timer: 1500
                              })
                              setInterval(() => {
                                window.location.reload()
                              }, 2000);
                            } else {
                              setMessage("An error has occurred when updating the enrolled")
                            }
                          })
              }}>{data.type === 'enroll' ? 'Enroll me' : 'Save'}</button>}
              <button type="button" className="btn btn-danger" onClick={() => setMessage("")} data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal