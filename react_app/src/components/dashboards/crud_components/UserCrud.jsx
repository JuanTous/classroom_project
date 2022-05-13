import React, { useEffect, useState } from 'react'
import AdminModal from '../../modals/AdminModal'

const UserCrud = ({users, programs}) => {
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
  
    }, [selectedUser])

    return (
        <>
            <table className="table table-borderless table-responsive align-middle text-center">
                <thead>
                    <tr>
                        <th>Tools</th>
                        <th>Names</th>
                        <th>Surnames</th>
                        <th>Email</th>
                        <th>Program</th>
                        <th><button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#addModal"><i className="fas fa-plus-circle me-1"></i>Add</button></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => {
                        return <tr>
                            <td><button className='btn btn-outline-info' data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=>{setSelectedUser(u)}}><i className="fas fa-edit me-1"></i>Edit</button></td>
                            <td>{u.names}</td>
                            <td>{u.surnames}</td>
                            <td>{u.email}</td>
                            <td>{u.program.name}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <AdminModal user={selectedUser} data={{
            id : "editModal",
            title : "Edit",
            type : "edit"
        }}/>

        <AdminModal user={{
            names: null,
            surnames: null,
            email: null,
            password: null,
            program: {"id": null}
        }} data={{
            id : "addModal",
            title : "Add",
            type : "add"
        }} programs={programs}/>
        </>
    )
}

export default UserCrud;