import React, { useState } from 'react';
import image from '../assets/AuthBackground.png';
import * as s from '../styles/auth.module.css';
import '../styles/global.css';
import { register } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
export default function Registartion() {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(nickname, email, password);
            navigate('/');
        } catch (err) {
            console.error('Помилка реєстрації:', err.response?.data || err.message);
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
                    <form className={s.authColumn} onSubmit={handleRegister}>
                        <h1>Реєстрація</h1>
                        <div>
                            <p>Nickname</p>
                            <input
                                className={s.authInputContainer}
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </div>
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
                            Зареєструватися
                        </button>
                        <p style={{ fontSize: 20 }}>Або</p>
                        {/* TODO Google auth*/}
                        <div className={s.redirectReg} style={{}}>
                            Вже зареєстровані? <a href="/login">Увійти</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
