import { Link } from "react-router-dom"
import React from "react"

const Admin = () => {
    return (
        <div>
        <section>
            <h1>Admins Page</h1>
            <br />
            <p>You must have been assigned an Admin role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
        </div>
    )
}

export default Admin