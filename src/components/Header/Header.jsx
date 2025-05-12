import React from 'react';
import * as style from './Header.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Header() {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const navigation = useNavigate();
    if (loading) {
        return <div className={style.container}></div>;
    }
    return (
        <div className={style.container}>
            <div className="content">
                <p
                    style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginRight: 100,
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigation('/')}
                >
                    Subscription Control System
                </p>
                <div className={style.nav}>
                    {!isAuthenticated ? (
                        <Link to="/login" style={{ marginLeft: 'auto' }}>
                            Авторизація
                        </Link>
                    ) : (
                        <>
                            <Link to="/subscriptions">Підписки</Link>
                            <Link to="/spendings">Витрати</Link>
                            <Link to="/history">Історія</Link>
                            <Link to="/settings">Налаштування</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
