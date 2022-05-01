import React, { useEffect, useState } from 'react'
import Modal from '../Modal'

const Student = ({user, subjects}) => {
    const [enrolled, setEnrolled] = useState([])
    const [errors, setErrors] = useState("")
    const [loading, setloading] = useState(true)

    const unsubscribe = (id) => {
            /* global Swal */
        Swal.fire({
            title: 'Do you want to drop this subject?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:9999/enrolled/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.ok === true && res.json())
                .then(data => {
                    if (data) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'The subject has been dropped',
                            showConfirmButton: false,
                            timer: 2500
                        })
                        let newList = enrolled.filter(e => e.id !== id)
                        setEnrolled(newList)
                    } else {
                        setErrors("The course could not be dropped")
                    }
                })
                .catch(err => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: err,
                        showConfirmButton: false,
                        timer: 5000
                    })
                })
            }
        });
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
        fetch(`http://localhost:9999/enrolled/student/${user.id}`)
        .then(res => res.ok === true && res.json())
        .then(data => {
            if (data) {
                setEnrolled(data)
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
                <div className="card-header"><h3><i className="fas fa-tasks me-2"></i>My subjects</h3></div>
                <div className="card-body">
                <div className='text-end'>{enrolled.length !== 0 && <span className='me-3'>FINAL</span>}</div>
                <div className="card mb-2">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                {enrolled.length !== 0 ? 
                (enrolled.map((e, i) => {
                    const {color, average} = getAverage(e.firstScore, e.secondScore, e.thirdScore)
                    return (  
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapseOne"+i} aria-expanded="false" aria-controls={"flush-collapseOne"+i}>
                            <div className="mw-100 w-75">
                                <span className='fs-3'>{e.courseSubject.subject.name}</span>
                            </div>
                            <span className="border-end w-25"></span>
                            <div className="text-center align-self-center d-flex fs-5 ms-3">
                                <span className="badge bg-primary">{e.firstScore === null ? 0 : e.firstScore}</span>
                                <span className="badge bg-primary ms-3">{e.secondScore === null ? 0 : e.secondScore}</span>
                                <span className="badge bg-primary ms-3">{e.thirdScore === null ? 0 : e.thirdScore}</span>
                                <span className={`badge ms-3 bg-${color}`}>{average}</span>
                            </div>
                        </button>
                        </h2>
                        <div id={"flush-collapseOne"+i} className="accordion-collapse collapse px-5 py-3" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div className="d-flex justify-content-between mw-100">
                            <div className='justify-content-around'>
                                <li><b>Credits: </b>{e.courseSubject.subject.credits}</li>
                                <li><b>Teacher: </b>{e.courseSubject.teacher.names} {e.courseSubject.teacher.surnames} {`<${e.courseSubject.teacher.email}>`}</li>
                                <li><b>Teacher program: </b>{e.courseSubject.teacher.program.name}</li>
                            </div>
                            <span className='align-self-center'><button className='btn btn-danger' onClick={() => unsubscribe(e.id)}>unsubscribe</button></span>
                            </div>
                        </div>
                    </div>
                    )
                })) 
                : (<h5 className='text-center text-secondary mb-0 p-2 fs-2'>There isn't any enrolled subject</h5>)}
                </div>
                </div>
                </div>
                <div className='card-footer'>
                    <div className='text-center'><button className='btn btn-outline-primary fs-3' data-bs-toggle="modal" data-bs-target="#enrollSubjectModal"><i className="far fa-plus-square me-2"></i>Enroll subject</button></div>
                </div>
            </div>
        </div>) : 
        (<h1 className="text-light text-center" style={{marginTop: "15rem"}}>{errors}</h1>)
        }

        <Modal subjects={subjects} enrolled={enrolled} data={{
            id : "enrollSubjectModal",
            title : "Enroll subject",
            type : "enroll"
        }} values={{
            student: {id : user.id},
            courseSubject : {id : null}, 
            firstScore : null,
            secondScore : null,
            thirdScore : null
          }} />
    </>
  )
}

export default Student