import React from 'react';
import * as style from './buttonStyle.module.css';
const CustomButton = ({ type, loading, text, onPress, cancel, customStyle }) => {
    return (
        <button
            disabled={loading}
            type={type}
            className={cancel ? style.gray_button : style.black_button}
            style={
                customStyle
                    ? customStyle
                    : loading
                      ? cancel
                          ? { backgroundColor: '#d9d9d9' }
                          : { backgroundColor: 'black' }
                      : {}
            }
            onClick={onPress}
        >
            {loading ? <div className="loader" style={{ margin: 'auto' }}></div> : text}
        </button>
    );
};

export default CustomButton;
