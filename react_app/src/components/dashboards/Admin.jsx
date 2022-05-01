import React, { useEffect, useState } from 'react'
import AdminModal from '../modals/AdminModal'

const Admin = ({user}) => {
    const [errors, setErrors] = useState("")
    const [loading, setloading] = useState(true)

    return (
        <>
        {loading ? (<div className="spinner" style={{marginTop: "11rem"}}></div>) :
            errors === '' ? 
            (<div className="col-xl-auto">
                <div className="card mb-4">
                    <div className="card-header"><h3><i className="fas fa-columns me-2"></i>Dashboard</h3></div>
                    <div className="card-body">
                    <div className="card mb-2">
                    <div className="accordion accordion-flush" id="accordionFlushExample">

                    </div>
                    </div>
                    </div>

                </div>
            </div>) : 
            (<h1 className="text-light text-center" style={{marginTop: "15rem"}}>{errors}</h1>)
        }
        <AdminModal />
        </>
    )
}

export default Admin