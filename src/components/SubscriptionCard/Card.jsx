import React from 'react';
import * as style from './Card.module.css';
import image from '../../assets/netflix.png';
import { CalendarClock } from 'lucide-react';
import PropTypes from 'prop-types';

export default function Card({ sub }) {
    return (
        <div className={style.cardContainer}>
            <img className={style.cardImage} src={sub.logo} />
            <div className={style.cardContent}>
                <p style={{ fontSize: 16, color: 'black', marginBottom: 6 }}>{sub.title}</p>
                <p>Вартість 35$</p>
                <div>
                    <CalendarClock width={19} />
                    <p>3 дні</p>
                </div>
            </div>
        </div>
    );
}
Card.propTypes = {
    sub: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number,
        billingCycle: PropTypes.string,
    }).isRequired,
};
