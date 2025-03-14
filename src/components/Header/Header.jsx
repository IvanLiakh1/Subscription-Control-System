import React from 'react';
import * as style from './Header.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Header() {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    if (loading) {
        return (
            <div className={style.container}>
                <p>Завантаження...</p>
            </div>
        );
    }
    return (
        <div className={style.container}>
            <div className="content" style={{ alignItems: 'center' }}>
                <p style={{ fontWeight: 'bold', fontSize: 24, marginRight: 80, whiteSpace: 'nowrap' }}>
                    Subscription Control System
                </p>
                <div className={style.nav}>
                    {!isAuthenticated ? (
                        <Link to="/login" style={{ marginLeft: 'auto' }}>
                            Авторизація
                        </Link>
                    ) : (
                        <>
                            <Link to="/">Головна</Link>
                            <Link to="/subscriptions">Підписки</Link>
                            <Link to="/costs">Витрати</Link>
                            <Link to="/history">Історія</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
