import React from 'react';
import CustomButton from '../Button/customButton';
import { useNavigate } from 'react-router-dom';

const AddSubscriptionTemplate = ({ children, onSubmit }) => {
    const navigate = useNavigate();
    return (
        <div className="content center" style={{ flexDirection: 'column' }}>
            {children}
            <div className="buttons_container">
                <CustomButton cancel={true} text="Скасувати" onPress={(e) => navigate(-1)} />
                <CustomButton text="Додати дані про підписку" onPress={(e) => onSubmit()} />
            </div>
        </div>
    );
};
export default AddSubscriptionTemplate;
