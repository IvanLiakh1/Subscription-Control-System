import React, { useEffect, useState } from 'react';
import * as style from './InfoList.module.css';
import { getSpendings } from '../../services/subscriptionServices';

const InfoList = ({ spendings }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const getPaymentType = (frequency) => {
        switch (frequency) {
            case 'daily':
                return 'Щоденно';
            case 'weekly':
                return 'Щотижня';
            case 'monthly':
                return 'Щомісячно';
            case 'yearly':
                return 'Щорічно';
            default:
                return 'Не вказано';
        }
    };

    return (
        <div className={style.tableContainer}>
            <div className={style.tableHeader}>
                <div className={style.headerCell}>Сервіс</div>
                <div className={style.headerCell}>Тип платежу</div>
                <div className={style.headerCell}>Вартість</div>
                <div className={style.headerCell}>Дата</div>
            </div>
            {spendings.map((item) => (
                <div key={item._id} className={style.tableRow}>
                    <div className={style.tableCell}>{item.subscriptionId?.title || item.title}</div>
                    <div className={style.tableCell}>
                        {getPaymentType(item.frequency || item.subscriptionId?.billingCycle)}
                    </div>
                    <div className={style.tableCell}>{item.subscriptionId?.price} ₴</div>
                    <div className={style.tableCell}>{formatDate(item.date)}</div>
                </div>
            ))}
        </div>
    );
};

export default InfoList;
