import React, { useState } from 'react'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // You can implement your authentication logic here
        // For simplicity, we're just checking if username and password are not empty
        if (username && password) {
            onLogin(username);
        } else {
            alert('Please enter username and password.');
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login