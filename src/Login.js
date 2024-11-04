import React, { useState } from 'react';

function Login ({ onLogin }) {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventdefault ();
        onLogin(username, password);

    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input
                 type="password"
                 placeholder="password"
                 value={password}
                 onChange={(event) => setPassword(event.target.value)}
             />
             <button type="submit">Login</button>
        </form>


    );

};

export default Login;
