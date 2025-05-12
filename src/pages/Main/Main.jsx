import React from 'react';
import * as style from './main.module.css';
import image from '../../assets/main.png';
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div className="content" style={{ justifyContent: 'space-between', flexDirection: 'column' }}>
            <div className="content" style={{ justifyContent: 'space-between' }}>
                <div className={style.start_now}>
                    <h1 className={style.upperText}>Контролюй свої активні підписки вже зараз</h1>
                    <p className={style.bottomText}>
                        Збери до купи, організуй та відслідковуй їх з допомогою системи контролю підписок
                    </p>
                    <Link to="subscriptions" className={style.redirect}>
                        Керуй підписками зараз
                    </Link>
                </div>
                <div>
                    <img src={image} className={style.img}></img>
                </div>
            </div>
        </div>
    );
}

export default Main;
