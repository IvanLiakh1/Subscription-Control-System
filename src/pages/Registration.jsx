import React, { useState } from 'react';
import * as s from '../styles/auth.module.css';
import '../styles/global.css';
import { register } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/Button/customButton';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yupValidation from '../validation/yupValidation';
export default function Registartion() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(yupValidation.registrationSchema),
    });
    const handleRegister = async (data) => {
        console.log('Submitted data:', data);
        try {
            setLoading(true);
            await register(data.username, data.email, data.password);
            navigate('/');
        } catch (err) {
            console.error('Помилка реєстрації:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={s.authBody}>
            <div className={s.container}>
                <div className={s.authContainer}>
                    <form onSubmit={handleSubmit(handleRegister)} className={s.authColumn}>
                        <h1>Реєстрація</h1>
                        <div>
                            <p>Nickname</p>
                            <Controller
                                control={control}
                                name="username"
                                render={({ field: { onChange, value } }) => (
                                    <input
                                        className={s.authInputContainer}
                                        type="text"
                                        value={value || ''}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            {errors.nickname && <p className="error-text">{errors.nickname.message}</p>}
                        </div>
                        <div>
                            <p>Email</p>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, value } }) => (
                                    <input
                                        className={s.authInputContainer}
                                        type="email"
                                        value={value || ''}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            {errors.email && <p className="error-text">{errors.email.message}</p>}
                        </div>
                        <div>
                            <p>Password</p>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, value } }) => (
                                    <input
                                        className={s.authInputContainer}
                                        type="password"
                                        value={value || ''}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            {errors.password && <p className="error-text">{errors.password.message}</p>}
                        </div>
                        <CustomButton type="submit" loading={loading} text="Зареєструватися" />
                        <p style={{ fontSize: 20 }}>Або</p>
                        {/* TODO Google auth*/}
                        <div className={s.redirectReg} style={{}}>
                            Вже зареєстровані? <a href="/login">Увійти</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
