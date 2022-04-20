import React, { useState, useEffect } from 'react'

const Modal = (props) => {
  var {data} = props 
  var {subjects} = props
  const [teachers, setTeachers] = useState([])
  const [message, setMessage] = useState("")
  const [selectedValues, setSelectedValues] = useState({subject : null, teacher : null})

  useEffect(() => {
  }, [subjects, teachers])
  

  const handleChange = (e) => {
    let {name, value} = e.target
    setSelectedValues({ ...selectedValues, [name]: value});
    if (name === "subject") {
      setSelectedValues({subject : null, teacher : null})
      data[name] = subjects.find(s => s.id === parseInt(value))
      fetch(`http://localhost:9999/people/teachers/program/${data[name].program.id}`)
      .then(res => res.json())
      .then(data => setTeachers(data.length !== 0 ? data : false))
      .catch(err => setMessage(err))
    }
    console.log(selectedValues)
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
                <select name="teacher" className="form-select form-select-lg" onChange={(e) => {
                  let {name, value} = e.target;
                  data[name] = teachers.find(t => t.id === parseInt(value))
                  console.log(data)
                }}>
                  <option value={""} selected disabled>{teachers.length === 0 ? "Select teacher to enroll" : !teachers ? "There are no teachers available for this subject" : "Select teacher to enroll"}</option>
                  {teachers instanceof Array & teachers.length !== 0 && teachers.map(({id, names, surnames}) => {
                    return <option value={id}>{names} {surnames}</option>
                  })}
                </select>                 
              </div>
              {message !== "" && <li className='text-danger fs-3'>{message}</li>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Save changes</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal