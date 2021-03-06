import React, { useEffect, useState } from 'react'
import Modal from '../modals/Modal'

const Teacher = ({user, subjects}) => {
  const [enrolled, setEnrolled] = useState([])
  const [errors, setErrors] = useState("")
  const [loading, setloading] = useState(true)
  const [assign, setAssign] = useState(null)

  const groupSubjects = (data) => {
    let ids = []
    let grouped = []
    data.forEach(e => {
      ids.push(e.courseSubject.subject.id)
    })

    ids = new Set(ids)

    ids.forEach(id => {
      let enr = data.find(d => d.courseSubject.subject.id === id)
      grouped.push({id: id, name: enr.courseSubject.subject.name, enrolled: []})
    })
    grouped.forEach(g => {
      data.forEach(d => {
        if (g.id === d.courseSubject.subject.id) {
          g.enrolled.push(d)
        }
      })
    })
    setEnrolled(grouped)
  }
  
  const getAverage = (n1, n2, n3) => {
    let color
    let average
    if (n1 === null && n2 === null && n3 === null) {
        color = "secondary"
        average = 0
    } else {
        average = ((n1 + n2 + n3) / 3).toFixed(2)
        if ((n1 === null || n1 === 0) || (n2 === null || n2 === 0) || (n3 === null || n3 === 0)) {
            color = "primary"
        } else {
            if (average >= 3.0) {
                color = "success"
            } else {
                color = "danger"
            }
        }
    }

    return {color, average};
  }

  useEffect(() => {
      fetch(`http://localhost:9999/enrolled/teacher/${user.id}`)
      .then(res => res.ok === true && res.json())
      .then(data => {
          if (data) {
            groupSubjects(data)
          } else {
              setErrors("The request to the server has not been found")
          }
          setloading(false)
      })
      .catch(err => setErrors(err))
  }, [])

  useEffect(()=>{
  }, [enrolled, loading, errors])

  return (
    <>
      {loading ? (<div className="spinner" style={{marginTop: "11rem"}}></div>) :
        errors === '' ? 
        (<div className="col-xl-auto">
            <div className="card mb-4">
                <div className="card-header"><h3><i className="fas fa-chalkboard-teacher me-2"></i>Subjects</h3></div>
                <div className="card-body">
                <div className="card mb-2">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                {enrolled.length !== 0 ? 
                (enrolled.map((e, i) => {
                    return (  
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapseOne"+i} aria-expanded="false" aria-controls={"flush-collapseOne"+i}>
                            <div className="mw-100 w-75">
                                <span className='fs-3'>{e.name}</span>
                            </div>
                            <span className="border-end w-25"></span>
                            <div className="text-center align-self-center d-flex fs-5 ms-3">
                                <span className="badge bg-primary">Students in this subject: {e.enrolled.length}</span>
                            </div>
                        </button>
                        </h2>
                        <div id={"flush-collapseOne"+i} className="accordion-collapse collapse px-5 py-3" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                          <table className="table table-borderless table-responsive align-middle text-center">
                            <thead>
                              <tr>
                                <th>Tools</th>
                                <th>Names</th>
                                <th>Email</th>
                                <th>First score</th>
                                <th>Second score</th>
                                <th>Third score</th>
                                <th>FINAL</th>
                              </tr>
                            </thead>
                            <tbody>
                              {e.enrolled.map(en => {
                                const {color, average} = getAverage(en.firstScore, en.secondScore, en.thirdScore)
                                return <tr>
                                         <td><button className='btn btn-outline-info' data-bs-toggle="modal" data-bs-target="#assignNoteModal" onClick={()=>setAssign(en)}><i className="fas fa-edit me-1"></i>Edit</button></td>
                                         <td>{`${en.student.names} ${en.student.surnames}`}</td>
                                         <td>{en.student.email}</td>
                                         <td>{en.firstScore === null ? 'Unrated' : en.firstScore}</td>
                                         <td>{en.secondScore === null ? 'Unrated' : en.secondScore}</td>
                                         <td>{en.thirdScore === null ? 'Unrated' : en.thirdScore}</td>
                                         <td><span className={`badge bg-${color}`}>{average}</span></td>
                                       </tr>
                              })}
                            </tbody>
                          </table>
                        </div>
                    </div>
                    )
                })) 
                : (<h5 className='text-center text-secondary mb-0 p-2 fs-2'>There is no student enrolled in any of your subjects</h5>)}
                </div>
                </div>
                </div>

            </div>
        </div>) : 
        (<h1 className="text-light text-center" style={{marginTop: "15rem"}}>{errors}</h1>)
      }
      <Modal subjects={null} enrolled={null} data={{
            id : "assignNoteModal",
            title : "Assign note",
            type : "assign"
        }} values={assign} />
    </>
  )
}

export default Teacher