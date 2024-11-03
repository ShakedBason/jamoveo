import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../Style/AppStyle.css';
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!username.trim() || !password.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all fields.',
            });
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if(response.ok){
                const data = await response.json();
                console.log(data);
                console.log(data.user.role);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.user.username);
                localStorage.setItem('role', data.user.role);
                localStorage.setItem('isAdmin', data.user.isAdmin);
                if(data.user.isAdmin){
                    navigate('/admin/home');
                }
                else{
                    navigate('/user/home');
                }
            }
            else 
            {
                const data = await response.json();
                throw new Error(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Swal.fire('Error!', error.message, 'error');
        }
    };

    return (
        <div >
                <form onSubmit={handleLogin}>
                <div className="login-box">
                    <h2>Welcome! please Log in</h2>
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Log in</button>
                    <Link to="/admin/register">Sign up as admin</Link>
                    <Link to="/user/register">Sign up as user</Link>
                    </div>
                </form>
            </div>
    );
};

export default LoginPage;
