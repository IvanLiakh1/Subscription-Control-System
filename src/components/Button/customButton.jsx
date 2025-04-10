import React from 'react';
import * as style from './buttonStyle.module.css';
// eslint-disable-next-line react/prop-types
const CustomButton = ({ type, loading, text }) => {
    return (
        <button
            disabled={loading}
            type={type}
            className={style.button}
            style={loading ? { backgroundColor: 'black' } : {}}
        >
            {loading ? <div className="loader" style={{ margin: 'auto' }}></div> : text}
        </button>
    );
};

export default CustomButton;
