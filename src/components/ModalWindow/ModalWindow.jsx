import React, { useState, useEffect } from 'react';
import * as s from './ModalWindow.module.css';
import { IoClose } from 'react-icons/io5';

const ModalWindow = ({ isOpen, onClose, children, style }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    return (
        <div className={`${s.modal} ${isVisible ? s.visible : ''}`} style={style}>
            <div className={s.content}>
                <button className={s.closeButton} onClick={onClose}>
                    <IoClose size={30} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;
