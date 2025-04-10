import React from 'react';
import * as style from './main.module.css';
import image from '../../assets/main.png';
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div className="content" style={{ justifyContent: 'space-between' }}>
            <div className={style.start_now}>
                <p style={{ marginBottom: 15 }}>
                    Керуй своїми активними підписками та відстежуй їх з єдиного інтерфейсу за допомогою системи контролю
                    підписок{' '}
                </p>
                <Link to="login" className={style.redirect}>
                    Керуй підписками зараз
                </Link>
            </div>
            <div>
                <img src={image} className={style.img}></img>
            </div>
        </div>
    );
}

export default Main;
