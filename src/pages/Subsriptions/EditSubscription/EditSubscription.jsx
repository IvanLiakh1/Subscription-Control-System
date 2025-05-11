import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation } from 'react-router-dom';
import AddSubscriptionTemplate from '../../../components/AddSubscription/AddSubscriptionTemplate';
import { DatePicker, Input, InputNumber } from 'antd';
import AutocompleteField from '../../../components/AutocompleteField/AutocompleteField';
import moment from 'moment';
import { editSubscriptions } from '../../../services/subscriptionServices';
import yupValidation from '../../../validation/yupValidation';
import { useNavigate } from 'react-router-dom';
const EditSubscription = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const subscription = location.state?.sub;
    const { TextArea } = Input;
    const billingCycles = [
        { value: 'daily', label: 'Щодня' },
        { value: 'weekly', label: 'Щотижнево' },
        { value: 'monthly', label: 'Щомісяця' },
        { value: 'yearly', label: 'Щорічно' },
    ];

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            price: subscription.price,
            billingCycle: subscription.billingCycle,
            notes: subscription.notes,
        },
        resolver: yupResolver(yupValidation.editSubscriptionSchema),
    });

    const onSubmit = async (data) => {
        try {
            await editSubscriptions({ ...data, id: subscription._id });
            navigate('/subscriptions');
        } catch (error) {
            console.error('Помилка при редагуванні підписки:', error);
        }
    };

    return (
        <AddSubscriptionTemplate onSubmit={handleSubmit(onSubmit)} submitTitle={'Зберегти зміни'}>
            <h3>Редагування даних про підписку</h3>
            <img src={subscription.logo} alt={subscription.title} />
            <Input
                placeholder="Назва сервісу"
                value={subscription.title}
                disabled
                className="inputContainer"
                size="large"
            />
            <Input
                placeholder="Категорія"
                value={subscription.category}
                disabled
                className="inputContainer"
                size="large"
            />
            <DatePicker
                placeholder="Дата активації підписки"
                value={moment(subscription.startDate)}
                disabled
                style={{ width: '100%' }}
                className="inputContainer"
            />
            <div style={{ width: '100%' }}>
                <Controller
                    name="billingCycle"
                    control={control}
                    render={({ field }) => (
                        <AutocompleteField
                            {...field}
                            placeholder="Періодичність оплати"
                            options={billingCycles}
                            onSelect={(value) => field.onChange(value)}
                        />
                    )}
                />
                {errors.billingCycle && <p className="error-text">{errors.billingCycle.message}</p>}
            </div>
            <div style={{ width: '100%' }}>
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                        <InputNumber
                            {...field}
                            placeholder="Вартість (грн)"
                            className="inputContainer"
                            size="large"
                            min={0}
                        />
                    )}
                />
                {errors.price && <p className="error-text">{errors.price.message}</p>}
            </div>
            <div style={{ width: '100%' }}>
                <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => (
                        <TextArea
                            {...field}
                            placeholder="Замітки"
                            className="inputContainer"
                            showCount
                            maxLength={100}
                            autoSize={{ minRows: 3 }}
                        />
                    )}
                />
            </div>
            {errors.notes && <p className="error-text">{errors.notes.message}</p>}
        </AddSubscriptionTemplate>
    );
};

export default EditSubscription;
