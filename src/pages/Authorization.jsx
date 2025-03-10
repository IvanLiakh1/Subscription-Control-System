import React, { useState } from 'react';
import image from '../assets/AuthBackground.png';
import * as s from '../styles/auth.module.css';
import { login } from '../services/authServices';
import { useNavigate } from 'react-router-dom';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            console.error('Помилка авторизації:', err.response?.data || err.message);
        }
    };
    return (
        <div className={s.authBody}>
            <div
                className={s.container}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className={s.authContainer}>
                    <form className={s.authColumn} onSubmit={handleLogin}>
                        <h1>Вхід</h1>
                        <div>
                            <p>Email</p>
                            <input
                                className={s.authInputContainer}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>Password</p>
                            <input
                                className={s.authInputContainer}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className={s.authButton} type="submit">
                            Увійти
                        </button>
                        <p style={{ fontSize: 20 }}>Або</p>
                        {/* TODO Google auth*/}
                        <div className={s.redirectReg} style={{}}>
                            Ще не зареєструвалися? <a href="/registration">Створіть аккаунт</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
