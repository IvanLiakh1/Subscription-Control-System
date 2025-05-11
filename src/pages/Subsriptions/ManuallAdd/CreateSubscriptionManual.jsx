import React, { useEffect, useState } from 'react';
import AddSubscriptionTemplate from '../../../components/AddSubscription/AddSubscriptionTemplate';
import * as style from './CreateSubscriptionManual.module.css';
import AutocompleteField from '../../../components/AutocompleteField/AutocompleteField';
import { addSubscription, getServices } from '../../../services/subscriptionServices';
import { DatePicker, Input, InputNumber } from 'antd';
import moment from 'moment';
import yupValidation from '../../../validation/yupValidation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateSubscriptionManual = () => {
    const { TextArea } = Input;
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
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
            price: null,
            billingCycle: null,
            notes: null,
            title: null,
            category: null,
            logo: null,
            startDate: null,
        },
        resolver: yupResolver(yupValidation.subscriptionSchema),
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const servicesResponse = await getServices();
                setServices(servicesResponse);
            } catch (error) {
                console.error('Помилка завантаження даних:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const handleCreateSubscription = async (data) => {
        try {
            await addSubscription(data);
        } catch (error) {
            console.error('Помилка при додаванні підписки:', error);
        }
    };

    return (
        <AddSubscriptionTemplate onSubmit={handleSubmit(handleCreateSubscription)} submitTitle={'Додати підписку'}>
            <h3>Додавання підписки власноруч</h3>
            <div style={{ width: '100%' }}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <AutocompleteField
                            {...field}
                            placeholder="Оберіть сервіс"
                            options={services.map((s) => ({
                                value: s.name,
                                label: s.name,
                                icon: s.logo,
                            }))}
                            onSelect={(value) => {
                                const selectedService = services.find((s) => s.name === value);
                                if (selectedService) {
                                    field.onChange(value);
                                    field.onBlur();
                                }
                            }}
                            loading={loading}
                        />
                    )}
                />
                {errors.title && <p className="error-text">{errors.title.message}</p>}
            </div>
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
                            onChange={(value) => field.onChange(value)}
                        />
                    )}
                />
                {errors.price && <p className="error-text">{errors.price.message}</p>}
            </div>
            <div style={{ width: '100%' }}>
                <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            placeholder="Дата активації підписки"
                            value={field.value ? moment(field.value) : null}
                            onChange={(date, dateString) => field.onChange(dateString)}
                            style={{ width: '100%' }}
                            disabledDate={(current) => current && current > moment().endOf('day')}
                            className="inputContainer"
                        />
                    )}
                />

                {errors.startDate && <p className="error-text">{errors.startDate.message}</p>}
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
                {errors.notes && <p className="error-text">{errors.notes.message}</p>}
            </div>
        </AddSubscriptionTemplate>
    );
};

export default CreateSubscriptionManual;
