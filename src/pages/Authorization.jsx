import React, { useState } from 'react';
import * as s from '../styles/auth.module.css';
import { login } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yupValidation from '../validation/yupValidation';
import CustomButton from '../components/Button/customButton';
function App() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(yupValidation.loginSchema),
    });

    const handleLogin = async (data) => {
        try {
            setLoading(true);
            await login(data.email, data.password);
            navigate('/');
        } catch (err) {
            console.log(err, '1231');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={s.authBody}>
            <div className={s.container}>
                <div className={s.authContainer}>
                    <form onSubmit={handleSubmit(handleLogin)} className={s.authColumn}>
                        <h1>Вхід</h1>
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

                        <CustomButton type="submit" loading={loading} text="Увійти" />

                        <p style={{ fontSize: 20 }}>Або</p>
                        {/* TODO Google auth */}
                        <div className={s.redirectReg}>
                            Ще не зареєструвалися? <a href="/registration">Створіть аккаунт</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
