import React, { useState } from 'react';
import AddSubscriptionTemplate from '../../components/AddSubscription/AddSubscriptionTemplate';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { TextField } from '@prismane/core';
import CustomButton from '../../components/Button/customButton';
import { useNavigate } from 'react-router-dom';
const CreateSubscriptionAuto = ({ state }) => {
    const [modalWindowIsOpen, setModalWindowOpen] = useState(true);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    return (
        <AddSubscriptionTemplate>
            <div>
                <p>Додавання підписки автоматично</p>
            </div>
        </AddSubscriptionTemplate>
    );
};
export default CreateSubscriptionAuto;
