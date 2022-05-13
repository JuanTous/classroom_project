import React, { useEffect, useState } from 'react'
import AdminModal from '../modals/AdminModal'
import UserCrud from './crud_components/UserCrud'
import AdminItems from './crud_components/UserCrud'

const Admin = ({user}) => {
    const [users, setUsers] = useState([])
    const [programs, setPrograms] = useState([])
    const [subjects, setSubjects] = useState([])
    const [courseSubjects, setCourseSubjects] = useState([])
    const [errors, setErrors] = useState("")
    const [loading, setloading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:9999/people/teachers')
        .then(res => res.json())
        .then(data => {
            setUsers(data)
            fetch('http://localhost:9999/subjects')
            .then(res => res.json())
            .then(data => {
                setSubjects(data)
                fetch('http://localhost:9999/course-subjects')
                .then(res => res.json())
                .then(data => {
                    setCourseSubjects(data)
                    fetch('http://localhost:9999/programs')
                    .then(res => res.json())
                    .then(data => {
                        setPrograms(data)
                        setloading(false)
                    })
                    .catch(err => setErrors(err))
                })
                .catch(err => setErrors(err))
            })
            .catch(err => setErrors(err))
        })
        .catch(err => setErrors(err))
    }, [])

    return (
        <>
        {loading ? (<div className="spinner" style={{marginTop: "11rem"}}></div>) :
            errors === '' ? 
            (<div className="col-xl-auto">
                <div className="card mb-4">
                    <div className="card-header"><h3><i className="fas fa-columns me-2"></i>Dashboard</h3></div>
                    <div className="card-body">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-users-tab" data-bs-toggle="pill" data-bs-target="#pills-users" type="button" role="tab" aria-controls="pills-users" aria-selected="true">Users</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-subjects-tab" data-bs-toggle="pill" data-bs-target="#pills-subjects" type="button" role="tab" aria-controls="pills-subjects" aria-selected="false">Subjects</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-course-subjects-tab" data-bs-toggle="pill" data-bs-target="#pills-course-subjects" type="button" role="tab" aria-controls="pills-course-subjects" aria-selected="false">Course subjects</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-users" role="tabpanel" aria-labelledby="pills-users-tab">
                            <UserCrud users={users} programs={programs}/>
                        </div>
                        <div className="tab-pane fade" id="pills-subjects" role="tabpanel" aria-labelledby="pills-subjects-tab">.2.</div>
                        <div className="tab-pane fade" id="pills-course-subjects" role="tabpanel" aria-labelledby="pills-course-subjects-tab">4</div>
                    </div>
                    </div>

                </div>
            </div>) : 
            (<h1 className="text-light text-center" style={{marginTop: "15rem"}}>{errors}</h1>)
        }
        </>
    )
}

export default Admin