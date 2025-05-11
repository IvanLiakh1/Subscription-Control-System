import React from 'react';
import CustomButton from '../Button/customButton';
import { useNavigate } from 'react-router-dom';

const AddSubscriptionTemplate = ({ children, onSubmit, submitTitle }) => {
    const navigate = useNavigate();
    return (
        <div className="content center formContainer" style={{ flexDirection: 'column' }}>
            {children}
            <div className="buttons_container" style={{ marginTop: '5px' }}>
                <CustomButton cancel={true} text="Скасувати" onPress={(e) => navigate(-1)} />
                <CustomButton text={submitTitle} onPress={(e) => onSubmit()} />
            </div>
        </div>
    );
};
export default AddSubscriptionTemplate;
