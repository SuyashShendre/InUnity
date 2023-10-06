import React, { useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    useEffect(() => {

        if (localStorage.getItem('user')) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [])
    return (
        <div>

        </div>
    )
}

export default Auth