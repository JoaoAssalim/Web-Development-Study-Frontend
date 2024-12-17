import './Login.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem("refresh");
        if (refreshToken) {
            const ApiRefreshToken = `${process.env.REACT_APP_BASE_URL}/token/refresh/`;

            axios.post(ApiRefreshToken, {
                refresh: refreshToken,
            })
              .then(function (response) {
                localStorage.setItem("token", response.data.access);
                localStorage.setItem("refresh", response.data.refresh);
                navigateToCarrers();
            })
              .catch(function (error) {
                console.log(error);
            });
        }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Username: " + username);
        console.log("Password: " + password);

        const ApiGetToken = `${process.env.REACT_APP_BASE_URL}/token/`;

        axios.post(ApiGetToken, {
            username: username,
            password: password,
        })
          .then(function (response) {
            localStorage.setItem("token", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            navigateToCarrers();
        })
          .catch(function (error) {
            console.log(error);
        });
    }

    function navigateToCarrers() {
        navigate("/list-carrers");
    }

    return (
        <div className="App">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome to System Frontend</h1>
                    <div className="input-field">
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button>Entrar</button>

                    <div className="signup-link">
                        <p>Don't have an account? <a href="#">Sign Up</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;