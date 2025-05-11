/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import * as styles from './dropdown.module.css';

const CustomDropdown = ({
    data,
    placeholder = 'Оберіть опцію',
    onSelect,
    label,
    includeAllOption = false,
    resetLabel = 'Усі категорії',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (item) => {
        const value = item === resetLabel ? null : item;
        setSelected(value);
        onSelect?.(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const displayValue = selected || (includeAllOption && !selected ? resetLabel : placeholder);

    return (
        <div>
            {label && <p className={styles.label}>{label}</p>}
            <div className={styles.dropdown} ref={dropdownRef}>
                <div className={styles.header} onClick={toggleDropdown}>
                    {displayValue}
                    <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
                </div>
                {isOpen && (
                    <div className={styles.menu}>
                        {includeAllOption && (
                            <div key="all" className={styles.option} onClick={() => handleSelect(resetLabel)}>
                                {resetLabel}
                            </div>
                        )}
                        {data.map((item, index) => (
                            <div key={index} className={styles.option} onClick={() => handleSelect(item)}>
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomDropdown;
