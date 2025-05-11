import React, { useEffect, useState } from 'react';
import * as style from './InfoList.module.css';
import { getSpendings } from '../../services/subscriptionServices';

const InfoList = ({ spendings }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = spendings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(spendings.length / itemsPerPage);
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
        <>
            <div className={style.tableContainer}>
                <div className={style.tableHeader}>
                    <div className={style.headerCell}>Сервіс</div>
                    <div className={style.headerCell}>Тип платежу</div>
                    <div className={style.headerCell}>Вартість</div>
                    <div className={style.headerCell}>Дата</div>
                </div>
                {currentItems.map((item) => (
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
            <div className={style.pagination}>
                {totalPages > 1 && (
                    <>
                        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                            {currentPage === 1 ? '1' : currentPage - 1}
                        </button>
                    </>
                )}

                {totalPages > 1 && currentPage != totalPages && (
                    <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage >= totalPages}>
                        {currentPage + 1}
                    </button>
                )}
            </div>
        </>
    );
};

export default InfoList;
