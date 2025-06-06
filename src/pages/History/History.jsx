import React, { useEffect, useState } from 'react';
import * as style from '../../components/InfoList/InfoList.module.css';
import * as style2 from './History.module.css';
import { getHistory } from '../../services/historyServices';
import toast, { Toaster } from 'react-hot-toast';
const History = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [items, setItems] = useState([]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };
    useEffect(() => {
        const handleGetHistory = async () => {
            try {
                const result = await toast.promise(getHistory(), {
                    loading: 'Завантаження історії...',
                    success: 'Історію успішно завантажено!',
                    error: 'Помилка при завантаженні історії',
                });
                setItems(result.list);
            } catch (error) {
                console.error('Помилка:', error);
            }
        };
        handleGetHistory();
    }, []);

    return (
        <div className="content" style={{ flexDirection: 'column' }}>
            <Toaster position="top-right" />
            <div className={style.tableContainer}>
                <div className={style2.tableHeader}>
                    <div className={style.headerCell}>Сервіс</div>
                    <div className={style.headerCell}>Опис дії</div>
                    <div className={style.headerCell}>Дата</div>
                </div>
                {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                        <div key={item._id} className={style2.tableRow}>
                            <div className={style.tableCell}>{item.serviceName || item.title}</div>
                            <div className={style.tableCell}>{item.action}</div>

                            <div className={style.tableCell}>{formatDate(item.date)}</div>
                        </div>
                    ))
                ) : (
                    <div style={{ alignItems: 'center', display: 'flex' }}>
                        <p style={{ margin: 'auto', padding: 10 }}>Список порожній</p>
                    </div>
                )}
            </div>
            <div className={style.pagination}>
                {totalPages > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            style={{ fontWeight: 'bold' }}
                        >
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
        </div>
    );
};
export default History;
