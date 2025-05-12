import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation } from 'react-router-dom';
import AddSubscriptionTemplate from '../../../components/AddSubscription/AddSubscriptionTemplate';
import { DatePicker, Input, InputNumber, Popconfirm, Button, notification } from 'antd';
import AutocompleteField from '../../../components/AutocompleteField/AutocompleteField';
import moment from 'moment';
import {
    changeStatusSubscription,
    deleteSubscription,
    editSubscriptions,
} from '../../../services/subscriptionServices';
import yupValidation from '../../../validation/yupValidation';
import { useNavigate } from 'react-router-dom';
import { Pause, Trash2, CirclePlay } from 'lucide-react';
import { Checkbox, message } from 'antd';

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
            notification: subscription.notification,
            title: subscription.title,
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
    const handleDelete = async () => {
        try {
            await deleteSubscription(subscription._id, subscription.title);
            navigate('/subscriptions');
        } catch (error) {
            console.error('Помилка при видаленні підписки:', error);
        }
    };
    const handleChangeStatus = async () => {
        try {
            await changeStatusSubscription(
                subscription._id,
                subscription.status === 'active' ? 'paused' : 'active',
                subscription.title,
            );
            navigate('/subscriptions');
        } catch (error) {
            console.error('Помилка при зміні статусу підписки:', error);
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
                            disabled={subscription.status === 'paused'}
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
                            disabled={subscription.status === 'paused'}
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
                            disabled={subscription.status === 'paused'}
                        />
                    )}
                />
            </div>
            {errors.notes && <p className="error-text">{errors.notes.message}</p>}
            <div style={{ width: '100%' }}>
                <Controller
                    name="notification"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={(e) => {
                                field.onChange(e.target.checked);
                            }}
                        >
                            Сповіщення на пошту
                        </Checkbox>
                    )}
                />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <Popconfirm
                    title={subscription.status === 'active' ? 'Деактивувати підписку?' : 'Активувати підписку?'}
                    okText="Так"
                    cancelText="Ні"
                    onConfirm={handleChangeStatus}
                >
                    <Button
                        type="default"
                        danger={subscription.status === 'active'}
                        style={{ borderRadius: '50%', width: 56, height: 56 }}
                        icon={subscription.status === 'active' ? <Pause /> : <CirclePlay />}
                    />
                </Popconfirm>
                <Popconfirm
                    title="Видалити підписку назавжди?"
                    onConfirm={handleDelete}
                    okText="Видалити"
                    cancelText="Скасувати"
                    okButtonProps={{ danger: true }}
                >
                    <Button
                        type="primary"
                        danger
                        style={{ borderRadius: '50%', width: 56, height: 56 }}
                        icon={<Trash2 />}
                    />
                </Popconfirm>
            </div>
        </AddSubscriptionTemplate>
    );
};

export default EditSubscription;
