import React from 'react'

function CourseSubjectCrud({courseSubjects}) {
  return (
    <>
        <table className="table table-borderless table-responsive align-middle text-center">
            <thead>
                <tr>
                    <th>Tools</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th><button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#addModal"><i className="fas fa-plus-circle me-1"></i>Add</button></th>
                </tr>
            </thead>
            <tbody>
                {courseSubjects.map(c => {
                    return <tr>
                        <td><button className='btn btn-outline-info' data-bs-toggle="modal" data-bs-target="#editModal" ><i className="fas fa-edit me-1"></i>Edit</button></td>
                        <td>{c.subject.name}</td>
                        <td>{c.teacher.names} {c.teacher.surnames}</td>
                        <td>{c.startDate}</td>
                        <td>{c.endDate}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
  )
}

export default CourseSubjectCrud