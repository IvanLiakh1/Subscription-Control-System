import React, { useEffect, useState } from 'react';
import AddSubscriptionTemplate from '../../../components/AddSubscription/AddSubscriptionTemplate';
import * as style from '../ManuallAdd/CreateSubscriptionManual.module.css';
import AutocompleteField from '../../../components/AutocompleteField/AutocompleteField';
import { addSubscription, getServices } from '../../../services/subscriptionServices';
import { DatePicker, Input, InputNumber } from 'antd';
import moment from 'moment';

const CreateSubscriptionAuto = () => {
    const [formData, setFormData] = useState({
        title: null,
        price: null,
        billingCycle: null,
        startDate: null,
        category: null,
        notes: null,
        logo: null,
    });
    const { TextArea } = Input;
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const billingCycles = [
        { value: 'daily', label: 'Щодня' },
        { value: 'weekly', label: 'Щотижнево' },
        { value: 'monthly', label: 'Щомісяця' },
        { value: 'yearly', label: 'Щорічно' },
    ];

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const servicesResponse = await getServices();
                setServices(servicesResponse);
                const uniqueCategories = [...new Set(servicesResponse.map((s) => s.category))].map((category) => ({
                    value: category,
                    label: category.charAt(0).toUpperCase() + category.slice(1),
                }));

                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Помилка завантаження даних:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCreateSubscription = async () => {
        try {
            const response = await addSubscription(formData);
        } catch (error) {
            console.error('Помилка при додаванні підписки:', error);
        }
    };

    return (
        <AddSubscriptionTemplate onSubmit={() => handleCreateSubscription()}>
            <h3>Додавання підписки автоматично</h3>
            <div className={style.formContainer}>
                <AutocompleteField
                    placeholder="Оберіть сервіс"
                    value={formData.title}
                    options={services.map((s) => ({
                        value: s.name,
                        label: s.name,
                        icon: s.logo,
                    }))}
                    onSelect={(value) => {
                        const selectedService = services.find((s) => s.name === value);
                        if (selectedService) {
                            handleChange('logo', selectedService.logo);
                            handleChange('title', selectedService.name);
                            handleChange('category', selectedService.category);
                        }
                    }}
                    loading={loading}
                />

                <AutocompleteField
                    placeholder="Періодичність оплати"
                    value={formData.billingCycle}
                    options={billingCycles}
                    onSelect={(value) => handleChange('billingCycle', value)}
                />

                <DatePicker
                    placeholder="Дата активації підписки"
                    value={formData.startDate ? moment(formData.startDate) : null}
                    onChange={(date, dateString) => handleChange('startDate', dateString)}
                    style={{ width: '100%' }}
                    disabledDate={(current) => current && current > moment().endOf('day')}
                    className="inputContainer"
                />
                <TextArea
                    placeholder="Замітки"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    className="inputContainer"
                    showCount
                    maxLength={100}
                    autoSize={{ minRows: 3 }}
                />
            </div>
        </AddSubscriptionTemplate>
    );
};

export default CreateSubscriptionAuto;
