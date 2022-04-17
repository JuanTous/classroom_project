import React, { useEffect, useState } from 'react'

const Student = ({user}) => {
    const [enrolled, setEnrolled] = useState([])
    const [errors, setErrors] = useState("")
    const [loading, setloading] = useState(true)

    const getAverage = (n1, n2, n3) => {
        let color
        let average
        if (n1 === null && n2 === null && n3 === null) {
            color = "secondary"
            average = 0
        } else {
            average = (n1 + n2 + n3) / 3
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
                console.log(data)
            } else {
                setErrors("The request to the server has not been found")
            }
            setloading(false)
        })
        .catch(err => setErrors(err))
    }, [])

    useEffect(()=>{
    }, [loading, errors])

  return (
    <>
        {loading ? (<div className="spinner" style={{marginTop: "11rem"}}></div>) :
        errors === '' ? 
        (<div className="col-xl-auto">
            <div className="card mb-4">
                <div className="card-header"><h3><i className="fas fa-tasks me-2"></i>Mis notas</h3></div>
                <div className="card-body">
                <div className='text-end'><span className='me-1'>FINAL</span></div>
                <div className="card mb-2">
                {enrolled.length !== 0 ? 
                (enrolled.map((e) => {
                    const {color, average} = getAverage(e.firstScore, e.secondScore, e.thirdScore)
                    return (
                        <div className="list-group-item text-primary d-flex overflow-auto">
                        <div className="mw-100 w-75">
                        <span className='fs-4'>{e.subject.name}</span>
                        </div>
                        <span className="border-end w-25"></span>
                        <div className="text-center align-self-center d-flex ms-3">
                        <span className="badge bg-primary">{e.firstScore === null && 0}</span>
                        <span className="badge bg-primary ms-3">{e.secondScore === null && 0}</span>
                        <span className="badge bg-primary ms-3">{e.thirdScore === null && 0}</span>
                        <span className={`badge ms-3 bg-${color}`}>{average}</span>
                        </div>
                    </div>
                    )
                })) 
                : (<h5>There isn't any enrolled subject</h5>)}
                </div>
                </div>
                <div className='card-footer'>

                </div>
            </div>
        </div>) : 
        (<h1 className="text-light text-center" style={{marginTop: "15rem"}}>{errors}</h1>)
        }
    </>
  )
}

export default Student