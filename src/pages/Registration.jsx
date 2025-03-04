import React, { useState } from 'react';
import axios from 'axios';
import image from '../assets/AuthBackground.png';
import * as s from '../styles/auth.module.css';
import '../styles/global.css';
function App() {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:7000/api/create-user',
                { nickname, email, password },
                { withCredentials: true },
            );
            console.log(response.data.error);
        } catch (err) {
            console.error(err.response.data);
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

export default App;
