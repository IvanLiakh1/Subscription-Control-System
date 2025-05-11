import React from 'react';
import * as style from './Card.module.css';
import { CalendarClock, NotebookText } from 'lucide-react';
import PropTypes from 'prop-types';
import { getTimeUntilNextPayment } from '../../Utils/date';

export default function Card({ sub }) {
    return (
        <div className={style.cardContainer}>
            <img
                className={style.cardImage}
                src={sub.logo}
                alt={sub.title}
                onError={(e) => {
                    e.target.src =
                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY3ZmEiLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjYzBjMWM1IiBmb250LWZhbWlseT0iJ0RtIFNhbnMnLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNTAwIiBmb250LXNpemU9IjE0Ij4KICAgICAgICB7c3ViLnRpdGxlfQogICAgPC90ZXh0Pgo8L3N2Zz4='.replace(
                            '{sub.title}',
                            encodeURIComponent(sub.title),
                        );
                }}
            />
            <div className={style.cardContent}>
                <h3 className={style.cardTitle}>{sub.title}</h3>
                <p className={style.priceText}>
                    <span>Вартість:</span>
                    <span style={{ fontWeight: 600, color: '#2d3748' }}>{sub.price} грн</span>
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

Card.propTypes = {
    sub: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number,
        billingCycle: PropTypes.string,
        nextPaymentDate: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        notes: PropTypes.string,
    }).isRequired,
};
