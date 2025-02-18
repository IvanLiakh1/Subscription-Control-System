import React from 'react';
import * as s from '../styles/sidebar.module.css';
import image from '../assets/Logo.svg';
import { NavLink } from 'react-router-dom';

const sections = [
    { id: 'subscriptions', label: 'Активні підписки', path: '/subscriptions' },
    { id: 'expenses', label: 'Витрати', path: '/expenses' },
    { id: 'history', label: 'Історія платежів', path: '/history' },
];

function Sidebar() {
    return (
        <aside className={s.sideBar}>
            <img src={image} alt="logo" className={s.logo} />
            <nav className={s.menu}>
                {sections.map(({ id, path, label }) => (
                    <NavLink key={id} to={path} className={({ isActive }) => (isActive ? s.active : '')}>
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
