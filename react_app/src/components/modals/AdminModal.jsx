import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const AdminModal = (props) => {
    const [user, setUser] = useState(props.user)
    const [message, setMessage] = useState("")
    const data = props.data
    const navigate = useNavigate()

    useEffect(() => {
        setUser(props.user)
    },[props])

    const handleChange = e => {
        const {name, value, type} = e.target;

        if(type === 'select-one') {
            user[name]["id"] = value
        } else {
            setUser({ ...user, [name]: value});
        }
    }

    const validate = () => {
        let valid = true
        if (data.type === 'add') {
            Object.keys(user).forEach(k => {
                console.log(user[k] instanceof Object)
                if (user[k] instanceof Object) {
                    if(user[k].id === null){
                        console.log(k+" nulo")
                        setMessage("Fill in the fields please")
                        valid = false;
                    }
                } else {
                    if(user[k] === null || user[k] === ""){
                        console.log(k+" nulo")
                        setMessage("Fill in the fields please")
                        valid = false;
                    }
                }
            })
        }
        return valid
    }

    const handleSubmit = () => {
        let valid = validate()

        valid && fetch(`http://localhost:9999/people/teachers/${data.type === 'edit' ? user.id : ""}`, {
            method: data.type === 'add' ? 'POST' : 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.ok === true && res.json())
        .then(data => {
            if (data) {
                setMessage("This teacher has been updated");
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            } else {
                setMessage("This teacher couldn't be updated")
            }
        }).catch(err => setMessage(err))
    }

    const deleteUser = id => {
        /* global Swal */
        Swal.fire({
            title: 'Do you want to delete this teacher?',
            text: 'You will not be able to undo this action',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:9999/people/teachers/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.ok === true && res.json())
                .then(data => {
                    if (data) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'operation completed',
                            showConfirmButton: false,
                            timer: 2500
                        })
                        setTimeout(() => {
                            window.location.reload()
                        }, 2500);
                    } else {
                        setMessage("The operation completed")
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

    return (
        <>
        <div className="modal fade" id={data.id} tabIndex="-1" aria-labelledby={"exampleModalLabel"+data.id} aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content bg-dark text-light">
                <div className="modal-header">
                <h3 className="modal-title text-uppercase" id={"exampleModalLabel"+data.id} >{data.title}</h3>
                </div>
                <div className="modal-body">
                    {user && Object.keys(user).map(k => {
                        return k !== 'id' && k !== 'program' && k !== 'profile' && 
                        <div className="form-outline text-start mb-4">
                                    <label className="form-label">{k.toUpperCase()}</label>
                                    <input type={isNaN(user[k]) || user[k] === ''|| !user[k] ? "text" : "number"} name={k} className="form-control form-control-lg" onChange={handleChange} value={user[k]} autoComplete="off" />
                                </div>
                    })}
                    {data.type === 'add' && 
                    (<div className="form-outline text-start mb-4">
                        <label className="form-label">Program</label>
                        <select name="program" className="form-select form-select-lg" onChange={handleChange}>
                        <option value={""} selected disabled>Select any program</option>
                        {props.programs.length !== 0 && props.programs.map(({id, name}) => {
                            return <option value={id}>{name}</option>
                        })}
                        </select>                 
                    </div>)}
                    {message !== "" && <li className='text-danger fs-3'>{message}</li>}
                </div>
                <div className="modal-footer">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                {data.type !== 'add' && <button type="button" className="btn btn-danger" onClick={() => deleteUser(user.id)} data-bs-dismiss="modal">Delete</button>}
                <button type="button" className="btn btn-warning" onClick={() => {setMessage(""); setUser(props.user)}} data-bs-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>
        </>

    )
}

export default AdminModal;