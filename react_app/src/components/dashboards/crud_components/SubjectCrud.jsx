import React, { useEffect, useState } from 'react'

export const SubjectCrud = ({subjects, programs}) => {

    
  return (
    <>
        <table className="table table-borderless table-responsive align-middle text-center">
            <thead>
                <tr>
                    <th>Tools</th>
                    <th>Name</th>
                    <th>Credits</th>
                    <th>Program</th>
                    <th><button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#addModal"><i className="fas fa-plus-circle me-1"></i>Add</button></th>
                </tr>
            </thead>
            <tbody>
                {subjects.map(s => {
                    return <tr>
                        <td><button className='btn btn-outline-info' data-bs-toggle="modal" data-bs-target="#editModal"><i className="fas fa-edit me-1"></i>Edit</button></td>
                        <td>{s.name}</td>
                        <td>{s.credits}</td>
                        <td>{s.program.name}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
  )
}

export default SubjectCrud
