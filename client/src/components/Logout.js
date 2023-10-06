import React from 'react'

const Logout = ({ onLogout }) => {
    const handleLogout = () => {
        // You can implement logout logic here
        onLogout();
    };
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout