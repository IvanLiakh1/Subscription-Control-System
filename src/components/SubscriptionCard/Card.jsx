import React from 'react';
import * as style from './Card.module.css';
import { CalendarClock, NotebookText } from 'lucide-react';
import { getTimeUntilNextPayment } from '../../Utils/date';
import { useNavigate } from 'react-router-dom';
export default function Card({ sub }) {
    const navigate = useNavigate();
    return (
        <div
            className={style.cardContainer}
            onClick={() => {
                navigate(`/edit-subscription`, {
                    state: { sub: sub },
                });
            }}
        >
            <img className={style.cardImage} src={sub.logo} alt={sub.title} />
            <div className={style.cardContent}>
                <h3 className={style.cardTitle}>{sub.title}</h3>
                <p className={style.priceText}>
                    <span>Вартість:</span>
                    <span style={{ fontWeight: 600, color: '#2d3748' }}>{sub.price} грн</span>
                </p>
                <p className={style.priceText}>
                    <span>Всього витрат:</span>
                    <span style={{ fontWeight: 600, color: '#2d3748' }}>{sub.totalSpent} грн</span>
                </p>
                <div className={style.paymentInfo}>
                    <CalendarClock width={16} height={16} />
                    <span>{getTimeUntilNextPayment(sub.nextPaymentDate, sub.billingCycle)}</span>
                </div>
            </div>

            {sub.notes && (
                <div className={style.notesContainer}>
                    <div className={style.notesTitle}>
                        <NotebookText width={14} height={14} style={{ marginRight: 6 }} />
                        Примітки
                    </div>
                    <div className={style.notesContent}>{sub.notes}</div>
                </div>
            )}
        </div>
    );
}
