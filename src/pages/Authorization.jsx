import React from 'react';
import image from '../assets/AuthBackground.png';
import * as s from '../styles/auth.module.css';
function App() {
    return (
        <>
            <div
                className={s.container}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className={s.authContainer}>
                    <div className={s.authColumn}>
                        <h1>Вхід</h1>
                        <div>
                            <p>Email</p>
                            <input className={s.authInputContainer} />
                        </div>
                        <div>
                            <p>Password</p>
                            <input className={s.authInputContainer} />
                        </div>
                        <button className={s.authButton}>Увійти</button>
                        <p style={{ fontSize: 20 }}>Або</p>
                        {/* TODO Google auth*/}
                        <div className={s.redirectReg} style={{}}>
                            Ще не зареєструвалися? <a href="/registration">Створіть аккаунт</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
