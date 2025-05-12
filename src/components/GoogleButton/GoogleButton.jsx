import React from 'react';
import * as style from './GoogleButton.module.css';
const GoogleButton = ({ isLogin }) => {
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:7000/api/user/auth/google';
    };

    return (
        <button onClick={handleGoogleLogin} className={style.button}>
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="google" className={style.icon} />
            {isLogin ? 'Увіти за допомого гугл' : 'Реєстрація за допомогою гугл'}
        </button>
    );
};

export default GoogleButton;
