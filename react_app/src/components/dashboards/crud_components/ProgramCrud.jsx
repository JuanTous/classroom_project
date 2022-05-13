import React from 'react'

const ProgramCrud = ({programs}) => {
  return (
    <>
        <table className="table table-borderless table-responsive align-middle text-center">
            <thead>
                <tr>
                    <th>Tools</th>
                    <th>Name</th>
                    <th><button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#addModal"><i className="fas fa-plus-circle me-1"></i>Add</button></th>
                </tr>
            </thead>
            <tbody>
                {programs.map(p => {
                    return <tr>
                        <td><button className='btn btn-outline-info' data-bs-toggle="modal" data-bs-target="#editModal" ><i className="fas fa-edit me-1"></i>Edit</button></td>
                        <td>{p.name}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
  )
}

export default ProgramCrud