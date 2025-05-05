import React from 'react';
import * as style from './Card.module.css';
import { CalendarClock } from 'lucide-react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function Card({ sub }) {
    const daysUntilNextPayment = moment(sub.nextPaymentDate).diff(moment(), 'days');

    return (
        <div className={style.cardContainer}>
            <img className={style.cardImage} src={sub.logo} alt={sub.title}  />
            <div className={style.cardContent}>
                <p style={{ fontSize: 16, color: 'black', marginBottom: 6 }}>{sub.title}</p>
                <p>Вартість: {sub.price} грн</p>
                <div>
                    <CalendarClock width={19} />
                    <p>{daysUntilNextPayment > 0 ? `${daysUntilNextPayment} днів до списання` : 'Списано'}</p>
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
        nextPaymentDate: PropTypes.string.isRequired,  
        logo: PropTypes.string.isRequired,  
    }).isRequired,
};
