import React from 'react';
import * as s from './ModalWindow.module.css';
import { IoClose } from 'react-icons/io5';
const ModalWindow = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div className={s.modal}>
                    <div className={s.wrapper}>
                        <div className={s.content}>
                            <button className={s.closeButton} onClick={() => onClose()}>
                                <IoClose size={30} />
                            </button>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default ModalWindow;
